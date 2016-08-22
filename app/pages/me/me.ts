import {Component, ViewChild} from '@angular/core';
import {Nav, NavController, Modal} from 'ionic-angular';

import {Auth} from '../../other/auth.component';
import {Common} from '../../other/common.component';

import {MeProfilePage} from '../me/me-profile';
import {MeNoticePage} from '../me/me-notice';
import {MeTimelinePage} from '../me/me-timeline';
import {MeSettingPage} from '../me/me-setting';

import {UserSignUpPage} from '../user/userSignUp';
import {UserLogInPage} from '../user/userLogIn';

@Component({
  templateUrl: 'build/pages/me/me.html'
})
export class MePage {
  // commonOpenModal: Common;

  constructor(
    private navCtrl: NavController,
    private nav: Nav,
    private auth: Auth
  ) {
    // this.commonOpenModal = new Common();
  }


  //
  // go to me profile page
  goToMeProfilePage() {
    if (this.auth.isAuth) {
      this.nav.push(MeProfilePage);
    } else {
      // this.commonOpenModal.openUserLogInModal();
    }
  }


  //
  // go to me setting page
  goToMeSettingPage() {
    if (this.auth.isAuth) {
      this.nav.push(MeSettingPage);
    } else {
      // this.commonOpenModal.openUserLogInModal();
    }
  }


  //
  // go to me notice page
  goToMeNoticePage() {
    if (this.auth.isAuth) {
      this.nav.push(MeNoticePage);
    } else {
      // this.commonOpenModal.openUserLogInModal();
    }
  }


  //
  // go to me timeline page
  goToMeTimelinePage() {
    if (this.auth.isAuth) {
      this.nav.push(MeTimelinePage);
    } else {
      // this.commonOpenModal.openUserLogInModal();
    }
  }
}
