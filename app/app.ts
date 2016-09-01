import {Component, ViewChild, enableProdMode} from '@angular/core';
import {Platform, ionicBootstrap, Events, Nav, ModalController, MenuController, Loading, LoadingController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HTTP_PROVIDERS} from '@angular/http';

import {Helper} from './other/helper.component';
import {Common} from './other/common.component';
import {Auth} from './other/auth.component';
import {User} from './models/user.model';
import {UserService} from './services/user.service';
import {TimelineService} from './services/timeline.service';
import {NoticeService} from './services/notice.service';

import {TabsPage} from './pages/tabs/tabs';
import {AuthenticatePage} from './pages/user/authenticate';


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
  noticeInterval: any;

  //
  loading: Loading;

  //
  isAuth: boolean = false;

  //
  appPages: PageObj[] = [
    {icon: 'pulse', title: 'Timeline', component: TabsPage, index: 0},
  ]

  //
  loggedInPages: [Object] = [
    {icon: 'person', title: 'MeHome', component: TabsPage, index: 1},
    {icon: 'log-out', title: 'Log Out', handler: 'logOutHandler', type: 'handler'},
  ]

  //
  loggedOutPages: [Object] = [
    {icon: 'log-in', title: 'Sign Up', component: AuthenticatePage, params: {modal: 'SignUp'}, type: 'modal'},
    {icon: 'log-in', title: 'Log In', component: AuthenticatePage, params: {modal: 'LogIn'}, type: 'modal'},
  ]


  //
  //
  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private events: Events,
    private userService: UserService,
    private noticeService: NoticeService,
    private loadingCtrl: LoadingController,
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
  }


  //
  //
  ngOnInit() {
    // set menu
    this.auth.getIsAuth().then(isAuth => {
      this.isAuth = isAuth;
      if (isAuth) {
        this.noticeService.getIndex();
      }

      setTimeout(() => {
        console.log('set menu');
        this.enableMenu(this.isAuth);
      }, 600);
    });

    //
    if (this.isAuth) {
      this.autoGetNotices();
    }

    // set user
    this.setUser();
  }


  //
  //
  openPage(page: PageObj) {
    if (page.type && page.type === 'modal') {
      this.openModal(page);
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
    this.openLoadingModal();
    this.userService.logOut()
    .then(ret => {
      this.auth.logOut();
      this.events.publish('auth:loggedOut');
      this.dismissLoadingModal();
    });
  }


  //
  //
  setUser() {
    this.userService.getUser().then(data => {
      this.auth.logIn(data);
    }, data => {
      this.auth.logOut();
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
  openModal(page) {
    let modalPage = this.modalCtrl.create(page.component, page.params);
    modalPage.present();
  }


  //
  //
  openLoadingModal() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }


  //
  //
  dismissLoadingModal() {
    this.loading.dismiss();
  }


  //
  //
  autoGetNotices() {
    this.noticeInterval = setInterval(() => {
      if (this.isAuth) {
        this.noticeService.getIndex();
      }
    }, 10000);
  }


  //
  //
  closeNoticeInterval() {
    clearInterval(this.noticeInterval);
  }


  //
  //
  listenToAuthEvents() {
    this.events.subscribe('auth:loggedIn', () => {
      this.enableMenu(true);
      this.autoGetNotices();
    });

    this.events.subscribe('auth:loggedOut', () => {
      this.enableMenu(false);
      this.noticeService.notices = [];
      this.closeNoticeInterval();
    });
  }
}



ionicBootstrap(MyApp, [
  HTTP_PROVIDERS,
  Helper,
  TimelineService,
  NoticeService,
  Common,
  Auth
], {
  backButtonText: '',
  tabbarPlacement: 'bottom'
})
