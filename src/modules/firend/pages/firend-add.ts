import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';


@Component({
  selector: 'page-firend-add',
  templateUrl: 'firend-add.html'
})
export class FirendAddPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }
}
