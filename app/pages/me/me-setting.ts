import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Helper} from '../../other/helper.component';
import {Auth} from '../../other/auth.component';
import {Common} from '../../other/common.component';
import {UserService} from '../../services/user.service';

import {MeSettingLanguagePage} from '../../pages/me/me-setting-language';
import {MeAboutPage} from '../../pages/me/me-about';

@Component({
  templateUrl: 'build/pages/me/me-setting.html',
  providers: [
    Common,
  ],
})
export class MeSettingPage {
  //
  meSettingLanguagePage = MeSettingLanguagePage;
  meAboutPage = MeAboutPage;


  constructor(
    private navCtrl: NavController,
    private auth: Auth,
    private common: Common,
    private userService: UserService
  ) {
  }


  //
  //
  goToLogOut() {
    this.common.openLoadingModal();

    this.userService.logOut()
    .then(ret => {
      this.common.dismissLoadingModal();
      this.auth.logOut();
      this.navCtrl.pop();
    });
  }
}
