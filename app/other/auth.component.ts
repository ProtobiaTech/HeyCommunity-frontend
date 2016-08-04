import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class Auth {
  storage = new Storage(LocalStorage);
  IS_AUTH: string = 'is_auth';
  USER_INFO: string = 'user_info';


  //
  //
  constructor(
    private http: Http,
    private events: Events
  ) {
  }


  //
  //
  isAuth() {
    return this.storage.get(this.IS_AUTH).then(value => {
      return value;
    });
  }


  //
  //
  logIn(params) {
    let userInfo: string = JSON.stringify(params);

    this.storage.set(this.IS_AUTH, true);
    this.storage.set(this.USER_INFO, userInfo);

    this.events.publish('auth:loggedIn');
  }


  //
  //
  logOut() {
    this.storage.remove(this.IS_AUTH);
    this.storage.remove(this.USER_INFO);

    this.events.publish('auth:loggedOut');
  }
}
