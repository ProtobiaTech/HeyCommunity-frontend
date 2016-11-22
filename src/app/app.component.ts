import { Component } from '@angular/core';
import { Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TranslateService } from 'ng2-translate';

import moment from 'moment';
import 'moment/src/locale/zh-cn';
import 'moment/src/locale/en-gb';

import { AppService } from '../modules/common/services/app.service';
import { UserService } from '../modules/user/services/user.service';
import { NoticeService } from '../modules/user/services/notice.service';

import { TabsPage } from '../pages/tabs/tabs';
// import { TutorialPage } from '../pages/tutorial/tutorial';


@Component({
  templateUrl: 'app.template.html'
})
export class MyApp {
  noticeInterval: any;

  rootPage = TabsPage;
  // rootPage = TutorialPage;

  APP_LANGUAGE: string = 'AppLanguage';


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public translateService: TranslateService,
    public events: Events,
    public userService: UserService,
    public noticeService: NoticeService,
    public menuCtrl: MenuController,
    public platform: Platform
  ) {
    console.log('Hey Community ~');

    //
    moment.locale('en-gb');

    // clear app loading handler
    window.clearTimeout((<any>window).appLoadingTid);

    //
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      //
      // get app language
      let lang = 'en-gb';
      if (window.localStorage.hasOwnProperty(this.APP_LANGUAGE)) {
        lang = window.localStorage.getItem(this.APP_LANGUAGE);
      } else {
        lang = window.navigator.language;
        lang = /^(zh-cn)$/gi.test(lang) ? 'zh-cn' : 'en-gb';
      }
      this.translateService.setDefaultLang(lang);
      this.translateService.getTranslation('zh-cn');
      this.translateService.getTranslation('en-gb');
      this.events.publish('app:changeLang', lang);

      this.menuCtrl.swipeEnable(false, 'main');
    });


    //
    // subscribe app changeLang
    this.events.subscribe('app:changeLang', (params) => {
      let lang = params[0];
      window.localStorage.setItem(this.APP_LANGUAGE, lang);
      this.translateService.use(lang);
      this.events.publish('app:changedLang', lang);
      moment.locale(lang);
    });


    //
    // subscribe auth loggedIn
    this.events.subscribe('auth:loggedIn', () => {
      console.log('user is logged-in');

      this.noticeInterval = setInterval(() => {
        this.noticeService.getIndex();
      }, 15000);
    });


    //
    // subscribe auth loggedOut
    this.events.subscribe('auth:loggedOut', () => {
      console.log('user is logged-out');

      clearInterval(this.noticeInterval);
    });
  }
}
