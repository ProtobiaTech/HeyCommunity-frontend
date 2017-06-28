import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { FirendService } from '../services/firend.service';

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
    public firendService: FirendService,
    public navCtrl: NavController
  ) {
  }


  //
  //
  ionViewDidEnter() {
    this.firendService.getFirends();
  }

  //
  //
  gotoFirendPage() {
    this.navCtrl.push(FirendAddPage);
  }

  //
  //
  gotoUserHomePage(userId) {
    this.navCtrl.push(UserPage, {userId: userId});
  }
}
