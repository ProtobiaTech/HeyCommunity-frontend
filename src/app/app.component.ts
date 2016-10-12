import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { AuthenticateService } from '../services/authenticate.service';
import { UserService } from '../services/user.service';

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
  constructor(
    public platform: Platform,
    public userService: UserService,
    public authService: AuthenticateService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


  //
  //
  ngAfterViewInit() {
    // get user
    this.userService.getUser().then(data => {
      this.authService.logIn(data);
    }, data => {
      this.authService.logOut();
    });

    // get notices
  }


}
