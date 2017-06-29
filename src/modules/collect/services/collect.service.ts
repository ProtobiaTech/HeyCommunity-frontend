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

  userCollects: Collect[] = [];
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
  // get user collects
  getUserCollects(userId = null): Promise<Collect[]> {
    //
    let api: string = this.helper.getAPI('collect/user-collects/?' + 'user_id=' + userId);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let data = response.json();
      this.userCollects = data.data;

      return data.data;
    })
    .catch(this.handleError);
  }


  //
  // get show
  getShow(id): Promise<Collect> {
    //
    let api: string = this.helper.getAPI('collect/show/?id=' + id);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let data = response.json();

      return data.data;
    })
    .catch(this.handleError);
  }


  //
  // get my collects
  getMyCollects(): Promise<Collect[]> {
    //
    let api: string = this.helper.getAPI('collect/user-collects');

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
  // get user follow collects
  getMyFollowCollects(): Promise<Collect[]> {
    //
    let api: string = this.helper.getAPI('collect/user-follow-collects');

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
  // store
  store(params): Promise<Collect> {
    let api: string = this.helper.getAPI('collect/store');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // update
  update(params): Promise<Collect> {
    let api: string = this.helper.getAPI('collect/update');
    let data: any = {content: params.content};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // destroy
  destroy(params): Promise<Collect> {
    let api: string = this.helper.getAPI('collect/destroy');
    let data: any = {id: params.id};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
