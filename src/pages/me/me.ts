import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

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
      this.presentAuthModal();
    }
  }


  //
  // goto me-timeline page
  gotoMeTimelinePage() {
    if (this.authService.isAuth) {
      this.navCtrl.push(MeTimelinePage);
    } else {
      this.presentAuthModal();
    }
  }


  //
  // open auth modal
  presentAuthModal() {
    let profileModal = this.modalCtrl.create(AuthenticatePage);
    profileModal.present();
  }
}
