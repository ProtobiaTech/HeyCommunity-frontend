import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';

import { FirendAddPage } from './firend-add';
import { UserPage } from '../../user/pages/user';


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

  //
  //
  gotoFirendPage() {
    this.navCtrl.push(FirendAddPage);
  }

  //
  //
  gotoUserHomePage() {
    this.navCtrl.push(UserPage, {userId: 2});
  }
}
