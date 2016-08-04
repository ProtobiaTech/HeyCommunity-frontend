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
  constructor(private http: Http) {
  }


  //
  //
  isAuth(): boolean {
    return true;
  }


  //
  //
  loggedIn(params) {
    let userInfo: string = JSON.stringify(params);
    console.log(userInfo);

    this.storage.set(this.IS_AUTH, true);
    this.storage.set(this.USER_INFO, userInfo);
  }


  //
  //
  loggedOut() {
    this.storage.remove(this.IS_AUTH);
    this.storage.remove(this.USER_INFO);
  }
}
