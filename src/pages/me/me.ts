import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';

import { AuthenticateService } from '../../services/authenticate.service';

import { MeNoticePage } from '../../pages/me/me-notice';
import { MeTimelinePage } from '../../pages/me/me-timeline';
import { MeSettingPage } from '../../pages/me/me-setting';

import { AuthenticatePage } from '../../pages/user/authenticate';


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
    public authComp: AuthenticateComponent,
    public navCtrl: NavController,
    public authService: AuthenticateService
  ) {
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
