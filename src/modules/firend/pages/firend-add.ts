import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';

import { FirendAddContactPage } from './firend-add-contact';


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


  //
  //
  gotoFirendAddContactPage() {
    this.navCtrl.push(FirendAddContactPage);
  }
}
