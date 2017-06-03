import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { NoticeService } from '../../notice/services/notice.service';

import { MeProfilePage } from './me-profile';
import { MeNoticePage } from '../../notice/pages/me-notice';
import { MyTimelinePage } from '../../timeline/pages/my-timeline';
import { MyTopicPage } from '../../topic/pages/my-topic';
import { MeSettingPage } from './me-setting';

import { SearchPage } from '../../common/pages/search';

import { UserSetPage } from './user-set';


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  MeSettingPage = MeSettingPage;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public noticeService: NoticeService,
    public navCtrl: NavController
  ) {
  }


  //
  // goto me-notice page
  gotoMeProfilePage() {
    if (this.heyApp.authService.authOrLogin()) {
      this.navCtrl.push(MeProfilePage);
    }
  }


  //
  //
  goUserSet() {
    this.navCtrl.push(UserSetPage)
  }

  //
  // goto me-notice page
  gotoMeNoticePage() {
    if (this.heyApp.authService.authOrLogin()) {
      this.navCtrl.push(MeNoticePage);
    }
  }


  //
  // goto me-timeline page
  gotoMyTimelinePage() {
    if (this.heyApp.authService.authOrLogin()) {
      this.navCtrl.push(MyTimelinePage);
    }
  }


  //
  // goto me-timeline page
  gotoMyTopicPage() {
    if (this.heyApp.authService.authOrLogin()) {
      this.navCtrl.push(MyTopicPage);
    }
  }


  //
  //
  gotoSearchPage() {
    this.navCtrl.push(SearchPage);
  }
}
