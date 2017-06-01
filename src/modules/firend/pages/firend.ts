import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';


@Component({
  selector: 'page-firend',
  templateUrl: 'firend.html'
})
export class FirendPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }
}
