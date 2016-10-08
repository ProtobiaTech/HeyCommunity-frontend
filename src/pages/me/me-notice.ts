import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Notice } from '../../models/notice';
import { NOTICES } from '../../mocks/notices';


@Component({
  selector: 'page-me-notice',
  templateUrl: 'me-notice.html'
})
export class MeNoticePage {
  notices: Notice[];


  //
  // constructor
  constructor(public navCtrl: NavController) {
    this.notices = NOTICES;
  }

}
