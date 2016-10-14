import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';

import { AuthenticateService } from '../../services/authenticate.service';
import { NoticeService } from '../../services/notice.service';

import { MeProfilePage } from '../../pages/me/me-profile';
import { MeNoticePage } from '../../pages/me/me-notice';
import { MeTimelinePage } from '../../pages/me/me-timeline';
import { MeSettingPage } from '../../pages/me/me-setting';


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  MeSettingPage = MeSettingPage;


  //
  // constructor
  constructor(
    public helper: Helper,
    public authService: AuthenticateService,
    public noticeService: NoticeService,
    public authComp: AuthenticateComponent,
    public navCtrl: NavController
  ) {
  }


  //
  // goto me-notice page
  gotoMeProfilePage() {
    if (this.authService.isAuth) {
      this.navCtrl.push(MeProfilePage);
    } else {
      this.authComp.presentAuthModal();
    }
  }


  //
  // goto me-notice page
  gotoMeNoticePage() {
    if (this.authService.isAuth) {
      this.navCtrl.push(MeNoticePage);
    } else {
      this.authComp.presentAuthModal();
    }
  }


  //
  // goto me-timeline page
  gotoMeTimelinePage() {
    if (this.authService.isAuth) {
      this.navCtrl.push(MeTimelinePage);
    } else {
      this.authComp.presentAuthModal();
    }
  }
}
