import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {User} from '../models/user.model';
import {Helper} from '../other/helper.component';


@Injectable()
export class UserService {
  //
  //
  constructor(
    private http: Http,
    private helper: Helper
  ) {
  }


  //
  //
  signUp(params): Promise<User> {
    let api: string = this.helper.getAPI('user/sign-up');
    let data: Object = params;

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  //
  logIn(params): Promise<User> {
    let api: string = this.helper.getAPI('user/log-in');
    let data: Object = params;

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  //
  logOut(): Promise<User> {
    let api: string = this.helper.getAPI('user/log-out');

    return this.http.post(api, null)
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
