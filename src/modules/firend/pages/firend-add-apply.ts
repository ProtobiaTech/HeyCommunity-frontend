import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';


@Component({
  selector: 'page-firend-add-apply',
  templateUrl: 'firend-add-apply.html'
})
export class FirendAddApplyPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }

  //
  //
  send() {

  }
}
