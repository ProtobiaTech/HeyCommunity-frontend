import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  //
  constructor(public navCtrl: NavController) {
  }


  //
  //
  goToLogOut() {
  }
}
