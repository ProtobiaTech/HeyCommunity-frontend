import { Component } from '@angular/core';
import { Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';

import { AppService } from '../modules/common/services/app.service';
import { UserService } from '../modules/user/services/user.service';
import { NoticeService } from '../modules/user/services/notice.service';

import { TabsPage } from '../pages/tabs/tabs';

import moment from 'moment';
import 'moment/src/locale/zh-cn';
import 'moment/src/locale/en-gb';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //
  rootPage = TabsPage;

  //
  noticeInterval: any;

  //
  APP_LANGUAGE: string = 'AppLanguage';


  constructor(
    public heyApp: AppService,
    public translateService: TranslateService,
    public events: Events,
    public userService: UserService,
    public noticeService: NoticeService,
    public menuCtrl: MenuController,
    public platform: Platform
  ) {
    console.log('Hey Community V3');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // menu swipe disabled
      this.menuCtrl.swipeEnable(false, 'main');

      // set app language
      this.setLang();

      // subscribe events
      this.subscribeEvents();
    });
  }


  //
  // Set lang
  setLang() {
    let lang: string;
    if (window.localStorage.hasOwnProperty(this.APP_LANGUAGE)) {
      lang = window.localStorage.getItem(this.APP_LANGUAGE);
    } else {
      lang = window.navigator.language;
      lang = /^(zh-cn)$/gi.test(lang) ? 'zh-cn' : 'en-gb';
    }

    this.translateService.getTranslation('en-gb');
    this.translateService.getTranslation('zh-cn');
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    moment.locale(lang);

    this.events.publish('app:changeLang', lang);
  }


  //
  // Subscribe events
  subscribeEvents() {
    // subscribe app changeLang
    this.events.subscribe('app:changeLang', (lang) => {
      window.localStorage.setItem(this.APP_LANGUAGE, lang);
      this.translateService.use(lang);
      moment.locale(lang);

      this.events.publish('app:changedLang', lang);
    });


    // subscribe auth loggedIn
    this.events.subscribe('auth:loggedIn', () => {
      console.log('user is logged-in');

      this.noticeInterval = setInterval(() => {
        this.noticeService.getIndex();
      }, 15000);
    });


    // subscribe auth loggedOut
    this.events.subscribe('auth:loggedOut', () => {
      console.log('user is logged-out');

      clearInterval(this.noticeInterval);
    });
  }
}
