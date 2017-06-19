import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthService {
  IS_AUTH: string = 'is_auth';
  USER_INFO: string = 'user_info';

  isAuth: boolean = false;
  userInfo: any;


  //
  // constructor
  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {
    this.getIsAuth();
  }


  //
  // auth or login
  authOrLogin() {
    if (this.isAuth) {
      return true;
    } else {
      console.log('publish event app:gotoLogin');
      this.events.publish('app:gotoLogin');
    }
  }


  //
  // get is auth
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
  // get user
  getUser() {
    return this.storage.get(this.USER_INFO).then(value => {
      this.userInfo = JSON.parse(value);
      return this.userInfo;
    })
  }


  //
  // log in
  logIn(params) {
    let userInfo: string = JSON.stringify(params);
    this.isAuth = true;
    this.userInfo = JSON.parse(userInfo);

    this.storage.set(this.IS_AUTH, true);
    this.storage.set(this.USER_INFO, userInfo);

    this.events.publish('auth:loggedIn');
  }


  //
  // reset
  reset(params) {
    this.logIn(params);
  }


  //
  // log out
  logOut() {
    this.isAuth = false;
    this.userInfo = null;

    this.storage.remove(this.IS_AUTH);
    this.storage.remove(this.USER_INFO);

    this.events.publish('auth:loggedOut');
  }


  //
  // wechat login
  wechatLogin() {
    this.getIsAuth().then(() => {
      if (!this.isAuth && this.isWeChatBrowser() && this.getParameterByName('noWeChatOAuth') != 'true') {
        window.location.assign('/api/wechat/o-auth');
      }
    });
  }


  //
  // is wechat browser
  isWeChatBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false ;
  }


  //
  // get Parameter By Name
  getParameterByName(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }
}
