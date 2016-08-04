import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, Modal, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HTTP_PROVIDERS} from '@angular/http';

import {Helper} from './other/helper.component';
import {Auth} from './other/Auth.component';

import {TabsPage} from './pages/tabs/tabs';
import {UserSignUpPage} from './pages/user/userSignUp';
import {UserLogInPage} from './pages/user/userLogIn';


interface PageObj {
  icon: string;
  title: string;
  component?: any;
  index?: number;
  type?: string;
  handler?: string;
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
    {icon: 'log-in', title: 'Sign Up', component: UserSignUpPage, type: 'modal'},
    {icon: 'log-in', title: 'Log In', component: UserLogInPage, type: 'modal'},
    {icon: 'log-out', title: 'Log Out', handler: 'logOutHandler', type: 'handler'},
  ]


  //
  //
  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private auth: Auth
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
  ngOnInit() {
    this.enableMenu(this.auth.isAuth());
  }


  //
  //
  openPage(page: PageObj) {
    if (page.type && page.type === 'modal') {
      this.showModal(page.component);
    } else if (page.type && page.type === 'handler') {
      if (this[page.handler]) {
        this[page.handler]();
      }
    } else {
      if (page.index) {
        this.nav.setRoot(page.component, {tabIndex: page.index});
      } else {
        this.nav.setRoot(page.component);
      }
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


  //
  //
  logOutHandler() {
    this.auth.loggedOut();
  }


  //
  //
  enableMenu(isAuth) {
    this.menuCtrl.enable(isAuth, 'loggedInMenu');
    this.menuCtrl.enable(!isAuth, 'loggedOutMenu');
  }


  //
  //
  showModal(page) {
    let modal = Modal.create(page);
    this.nav.present(modal);
  }
}


ionicBootstrap(MyApp, [
  HTTP_PROVIDERS,
  Helper,
  Auth
], {
  backButtonText: '',
  tabbarPlacement: 'bottom'
})
