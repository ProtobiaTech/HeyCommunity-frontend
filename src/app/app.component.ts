import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppService } from '../modules/common/services/app.service';

import { TabsPage } from '../pages/tabs/tabs';
import { FirstPage } from '../modules/common/pages/first';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //
  // rootPage = TabsPage;
  rootPage: any;

  //
  noticeInterval: any;


  constructor(
    public heyApp: AppService,
    public menuCtrl: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public platform: Platform
  ) {
    console.log('Hey Community V3');

    this.storage.get('is_auth').then(value => {
      let isAuth = value ? true : false;

      if (isAuth) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = FirstPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // menu swipe disabled
      this.menuCtrl.swipeEnable(false, 'main');

      // set app lang
      this.heyApp.setLang();

      if (platform.is('cordova')) {
      }
    });
  }
}
