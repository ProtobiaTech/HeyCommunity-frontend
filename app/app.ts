import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HTTP_PROVIDERS} from '@angular/http';
import {Helper} from './other/helper.component';

import {TabsPage} from './pages/tabs/tabs';
import {TimelinePage} from './pages/timeline/timeline';


interface PageObj {
  icon: string;
  title: string;
  component?: any;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private rootPage:any;

  appPages: PageObj[] = [
    {icon: 'pulse', title: 'Timeline', component: TabsPage, index: 0},
    {icon: 'images', title: 'Timeline', component: TabsPage, index: 1},
    {icon: 'flower', title: 'Timeline', component: TabsPage, index: 2},
    {icon: 'sunny', title: 'Timeline', component: TabsPage, index: 3},
    {icon: 'aperture', title: 'Timeline', component: TabsPage, index: 4},
  ]

  loggedOutPages: [Object] = [
    {icon: 'log-in', title: 'Login'},
    {icon: 'log-out', title: 'Logout'},
  ]


  //
  //
  constructor(
    private platform:Platform
  ) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


  //
  //
  openPage(page: PageObj) {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    /*
    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
    */
  }
}


ionicBootstrap(MyApp, [
  HTTP_PROVIDERS,
  Helper
], {
  backButtonText: '',
  tabbarPlacement: 'bottom'
})
