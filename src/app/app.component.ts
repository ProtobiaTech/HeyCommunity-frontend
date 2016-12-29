import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

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

      // set app lang
      this.heyApp.setLang();
    });
  }
}
