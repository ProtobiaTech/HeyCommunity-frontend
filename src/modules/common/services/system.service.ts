import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { System } from '../models/system.model';
import { Helper } from './helper.service';


@Injectable()
export class SystemService {
  headers: Headers;
  requestOptions: RequestOptions;
  CACHE_SYSTEM_INFO: string = 'cache_system_info';

  //
  // constructor
  constructor(
    private http: Http,
    private helper: Helper
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }


  //
  // get info
  getInfo(): Promise<System> {
    let api: string = this.helper.getAPI('system/info');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      window.localStorage.setItem(this.CACHE_SYSTEM_INFO, JSON.stringify(response.json()));
      return response.json();
    }).catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
