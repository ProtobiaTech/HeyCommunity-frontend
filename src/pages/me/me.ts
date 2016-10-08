import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MeNoticePage } from '../../pages/me/me-notice';
import { MeTimelinePage } from '../../pages/me/me-timeline';
import { MeSettingPage } from '../../pages/me/me-setting';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  MeNoticePage = MeNoticePage;
  MeTimelinePage = MeTimelinePage;
  MeSettingPage = MeSettingPage;


  //
  //
  constructor(public navCtrl: NavController) {
  }
}
