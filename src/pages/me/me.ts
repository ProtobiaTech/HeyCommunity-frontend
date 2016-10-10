import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateService } from '../../services/authenticate.service';

import { MeNoticePage } from '../../pages/me/me-notice';
import { MeTimelinePage } from '../../pages/me/me-timeline';
import { MeSettingPage } from '../../pages/me/me-setting';

import { CommonComponent } from '../../pages/common-component/common-component';
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
    public commonComponent: CommonComponent,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public authService: AuthenticateService
  ) {
  }


  //
  // goto me-notice page
  gotoMeNoticePage() {
    if (this.authService.isAuth) {
      this.navCtrl.push(MeNoticePage);
    } else {
      this.commonComponent.presentAuthModal();
    }
  }


  //
  // goto me-timeline page
  gotoMeTimelinePage() {
    if (this.authService.isAuth) {
      this.navCtrl.push(MeTimelinePage);
    } else {
      this.commonComponent.presentAuthModal();
    }
  }
}
