import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Events, Nav, Modal, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HTTP_PROVIDERS} from '@angular/http';

import {Helper} from './other/helper.component';
import {Auth} from './other/auth.component';
import {User} from './models/user.model';
import {UserService} from './services/user.service';

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
  templateUrl: 'build/app.html',
  providers: [
    UserService,
  ],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //
  private rootPage:any;

  //
  user: User = {id: 0, nickname: '', phone: ''};

  //
  isAuth: boolean = false;

  //
  appPages: PageObj[] = [
    {icon: 'pulse', title: 'Timeline', component: TabsPage, index: 0},
    {icon: 'images', title: 'Timeline', component: TabsPage, index: 0},
    {icon: 'flower', title: 'Timeline', component: TabsPage, index: 0},
    {icon: 'sunny', title: 'Timeline', component: TabsPage, index: 0},
    {icon: 'aperture', title: 'Timeline', component: TabsPage, index: 0},
  ]

  //
  loggedInPages: [Object] = [
    {icon: 'log-out', title: 'Log Out', handler: 'logOutHandler', type: 'handler'},
  ]

  //
  loggedOutPages: [Object] = [
    {icon: 'log-in', title: 'Sign Up', component: UserSignUpPage, type: 'modal'},
    {icon: 'log-in', title: 'Log In', component: UserLogInPage, type: 'modal'},
  ]


  //
  //
  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private events: Events,
    private userService: UserService,
    private auth: Auth
  ) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // listen to auth events
    this.listenToAuthEvents();

    // set menu
    this.auth.getIsAuth().then(isAuth => {
      this.enableMenu(isAuth);
      this.isAuth = isAuth;
    })

    // set user
    this.setUser();
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
  }


  //
  // log out handler
  logOutHandler() {
    this.userService.logOut()
    .then(ret => {
      this.auth.logOut();
      this.events.publish('auth:loggedOut');
    });
  }


  //
  //
  setUser() {
    this.auth.getUser().then(data => {
      this.user = data;
    });
  }


  //
  //
  listenToAuthEvents() {
    this.events.subscribe('auth:loggedIn', () => {
      this.enableMenu(true);
      this.setUser();
    });

    this.events.subscribe('auth:loggedOut', () => {
      this.enableMenu(false);
    });
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
