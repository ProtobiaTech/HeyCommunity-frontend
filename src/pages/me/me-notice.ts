import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Notice } from '../../models/notice.model';
import { Helper } from '../../other/helper';


@Component({
  selector: 'page-me-notice',
  templateUrl: 'me-notice.html'
})
export class MeNoticePage {
  notices: Notice[];


  //
  // constructor
  constructor(
    public helper: Helper,
    public navCtrl: NavController
  ) {
    this.notices = [];
  }

}
