import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
// import { TutorialPage } from '../pages/tutorial/tutorial';


@Component({
  template: `<ion-nav [root]="rootPage" swipe-to-go-back="true"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  // rootPage = TutorialPage;


  //
  // constructor
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
