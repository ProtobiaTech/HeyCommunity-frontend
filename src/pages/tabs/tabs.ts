import { Component } from '@angular/core';

import { AppService } from '../../modules/common/services/app.service';
import { UserService } from '../../modules/user/services/user.service';
import { NoticeService } from '../../modules/user/services/notice.service';

import { TimelinePage } from '../../modules/timeline/pages/timeline';
import { TopicPage } from '../../modules/topic/pages/topic';
import { MePage } from '../../modules/user/pages/me';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TimelinePage;
  tab2Root: any = TopicPage;
  tab4Root: any = MePage;


  //
  // construct
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public noticeService: NoticeService
  ) {
  }


  //
  //
  ionViewDidLoad() {
    console.log('app did load');
    // get user
    this.userService.getUser().then(data => {
      this.heyApp.authService.logIn(data);

      // get notice
      this.noticeService.getIndex();
    }, data => {
      this.heyApp.authService.logOut();
    });
  }
}
