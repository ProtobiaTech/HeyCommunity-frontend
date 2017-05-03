import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppService } from '../modules/common/services/app.service';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //
  rootPage = TabsPage;

  //
  noticeInterval: any;


  constructor(
    public heyApp: AppService,
    public menuCtrl: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public platform: Platform
  ) {
    console.log('Hey Community V3');

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
