import { NgModule } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Badge } from 'ionic-native';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { NoticeService } from './services/notice.service';
import { NoticeTranslations } from './i18n/notice-translations';

import { MeNoticePage } from './pages/me-notice';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MeNoticePage,
  ],
  entryComponents: [
    MeNoticePage,
  ],
  providers: [
    NoticeService,
  ],
  exports: [
  ],
})
export class NoticeModule {
  constructor(
    public platform: Platform,
    public events: Events,
    public heyApp: AppService,
    public noticeService: NoticeService,
  ) {
    // load translations
    this.heyApp.loadTranslations(NoticeTranslations);

    // subscribe events
    this.subscribeEvents();

    // platform ready
    this.platform.ready().then(() => {
      // ji guang
      this.initJiGuang();
    });
  }


  //
  // init jiguang push
  initJiGuang() {
    if (this.platform.is('cordova')) {
      let jPush = (<any> window).plugins.jPushPlugin;
      jPush.init();

      let theThis = this;
      (<any> document).addEventListener('jpush.receiveNotification', function(event) {
        console.log('Receive Notificaiton', JSON.stringify(event));
        theThis.noticeService.getIndex();
      }, false);

      (<any> document).addEventListener('jpush.openNotification', function(event) {
        console.log('Open Notificaiton', JSON.stringify(event));
        theThis.events.publish('app:gotoPage', {page: MeNoticePage});
      }, false)
    }
  }


  //
  // Subscribe events
  subscribeEvents() {
    // subscribe auth loggedIn
    this.events.subscribe('auth:loggedIn', () => {
      this.noticeService.noticeInterval = setInterval(() => {
        this.noticeService.getIndex();
      }, 15000);
    });

    //
    // subscribe auth loggedOut
    this.events.subscribe('auth:loggedOut', () => {
      clearInterval(this.noticeService.noticeInterval);
    });

    //
    // subscribe notice get index
    this.events.subscribe('notice:getIndex', (params) => {
      if (this.platform.is('cordova')) {
        Badge.set(params.num);
      }
    });
  }
}
