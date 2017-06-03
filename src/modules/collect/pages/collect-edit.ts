import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';


@Component({
  selector: 'page-collect-edit',
  templateUrl: 'collect-edit.html'
})
export class CollectEditPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }
}
