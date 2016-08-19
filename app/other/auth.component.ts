import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class Auth {
  storage = new Storage(LocalStorage);
  IS_AUTH: string = 'is_auth';
  USER_INFO: string = 'user_info';
  isAuth: boolean = false;


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
      this.isAuth = value;
      return this.isAuth;
    });
  }


  //
  //
  getUser() {
    return this.storage.get(this.USER_INFO).then(value => {
      return JSON.parse(value);
    })
  }


  //
  //
  logIn(params) {
    let userInfo: string = JSON.stringify(params);
    this.isAuth = true;

    this.storage.set(this.IS_AUTH, true);
    this.storage.set(this.USER_INFO, userInfo);

    this.events.publish('auth:loggedIn');
  }


  //
  //
  logOut() {
    this.isAuth = false;
    this.storage.remove(this.IS_AUTH);
    this.storage.remove(this.USER_INFO);

    this.events.publish('auth:loggedOut');
  }
}
