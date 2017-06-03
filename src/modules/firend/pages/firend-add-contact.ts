import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';

import { FirendAddApplyPage } from './firend-add-apply';


@Component({
  selector: 'page-firend-add-contact',
  templateUrl: 'firend-add-contact.html'
})
export class FirendAddContactPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }

  //
  //
  gotoFirendAddApplyPage() {
    this.navCtrl.push(FirendAddApplyPage);
  }
}
