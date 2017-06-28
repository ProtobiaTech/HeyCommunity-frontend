import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { User } from '../../user/models/user.model';
import { Helper } from '../../common/services/helper.service';


@Injectable()
export class FirendService {
  headers: Headers;
  requestOptions: RequestOptions;

  firends: User[];


  //
  // constructor
  constructor(
    public http: Http,
    public helper: Helper,
    public storage: Storage
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }


  //
  // get firends
  getFirends(): Promise<User[]> {
    //
    let api: string = this.helper.getAPI('user-relation/firends');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let data = response.json();
      this.firends = data.data;

      return data.data;
    })
    .catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
