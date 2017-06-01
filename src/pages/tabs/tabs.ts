import { Component } from '@angular/core';
import { Events, Platform, NavController } from 'ionic-angular';

import { AppService } from '../../modules/common/services/app.service';
import { UserService } from '../../modules/user/services/user.service';
import { NoticeService } from '../../modules/notice/services/notice.service';

import { TimelinePage } from '../../modules/timeline/pages/timeline';
import { MePage } from '../../modules/user/pages/me';
import { MeNoticePage } from '../../modules/notice/pages/me-notice';
import { FirendPage } from '../../modules/firend/pages/firend';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  timelineTabRoot: any = TimelinePage;
  meTabRoot: any = MePage;
  meNoticeTabRoot: any = MeNoticePage;

  firendTabRoot: any = FirendPage;

  constructor(
    public platform: Platform,
    public events: Events,
    public heyApp: AppService,
    public navCtrl: NavController,
    public userService: UserService,
    public noticeService: NoticeService
  ) {
    this.subscribeEvents();
  }


  //
  // Subscribe events
  subscribeEvents() {
    //
    // subscribe app gotoPage
    this.events.subscribe('app:gotoPage', (params) => {
      this.navCtrl.push(params.page);
    });
  }
}
