import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

import { MeHeyCommunityPage } from '../../pages/me/me-heycommunity';
import { MeSettingLanguagePage } from '../../pages/me/me-setting-language';


@Component({
  selector: 'page-setting',
  templateUrl: 'me-setting.html'
})
export class MeSettingPage {
  MeHeyCommunityPage = MeHeyCommunityPage;
  MeSettingLanguagePage = MeSettingLanguagePage;


  //
  // constructor
  constructor(
    public helper: Helper,
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthenticateService
  ) {
  }


  //
  // goto log out
  gotoLogOut() {
    this.userService.logOut()
    .then(ret => {
      this.authService.logOut();
      this.navCtrl.pop();
    });
  }
}
