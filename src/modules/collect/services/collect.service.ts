import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { Collect } from '../models/collect.model';
import { Helper } from '../../common/services/helper.service';


@Injectable()
export class CollectService {
  headers: Headers;
  requestOptions: RequestOptions;

  myCollects: Collect[] = [];
  myFollowCollects: Collect[] = [];

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
  // get my collects
  getMyCollects(): Promise<Collect[]> {
    //
    let api: string = this.helper.getAPI('collect/my-collects');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let data = response.json();
      this.myCollects = data.data;

      return data.data;
    })
    .catch(this.handleError);
  }


  //
  // get my follow collects
  getMyFollowCollects(): Promise<Collect[]> {
    //
    let api: string = this.helper.getAPI('collect/my-follow-collects');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let data = response.json();
      this.myFollowCollects = data.data;

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
