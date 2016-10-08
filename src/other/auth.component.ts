import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage, LocalStorage, Events} from 'ionic-angular';

import {User} from '../models/user.model';


@Injectable()
export class Auth {
  storage = new Storage(LocalStorage);
  IS_AUTH: string = 'is_auth';
  USER_INFO: string = 'user_info';

  isAuth: boolean = false;
  userInfo: any;


  //
  //
  constructor(
    private http: Http,
    private events: Events
  ) {
  }


  //
  //
  getIsAuth() {
    return this.storage.get(this.IS_AUTH).then(value => {
      this.isAuth = value ? true : false;

      if (this.isAuth) {
        this.userInfo = this.getUser();
      }

      return this.isAuth;
    });
  }


  //
  //
  getUser() {
    return this.storage.get(this.USER_INFO).then(value => {
      this.userInfo = JSON.parse(value);
      return this.userInfo;
    })
  }


  //
  //
  logIn(params) {
    let userInfo: string = JSON.stringify(params);
    this.isAuth = true;
    this.userInfo = JSON.parse(userInfo);

    this.storage.set(this.IS_AUTH, true);
    this.storage.set(this.USER_INFO, userInfo);

    this.events.publish('auth:loggedIn');
  }


  //
  //
  reset(params) {
    this.logIn(params);
  }


  //
  //
  logOut() {
    this.isAuth = false;
    this.userInfo = null;

    this.storage.remove(this.IS_AUTH);
    this.storage.remove(this.USER_INFO);

    this.events.publish('auth:loggedOut');
  }
}
