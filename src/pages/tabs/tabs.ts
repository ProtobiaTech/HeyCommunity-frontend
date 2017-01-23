import { Component } from '@angular/core';
import { Events, Platform, NavController } from 'ionic-angular';

import { AppService } from '../../modules/common/services/app.service';
import { UserService } from '../../modules/user/services/user.service';
import { NoticeService } from '../../modules/notice/services/notice.service';

import { TimelinePage } from '../../modules/timeline/pages/timeline';
import { TopicPage } from '../../modules/topic/pages/topic';
import { MePage } from '../../modules/user/pages/me';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  timelineTabRoot: any = TimelinePage;
  topicTabRoot: any = TopicPage;
  userTabRoot: any = MePage;

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
