import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';

import { CollectEditPage } from '../../collect/pages/collect-edit';
import { CollectMemberPage } from '../../collect/pages/collect-member';


@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }


  //
  //
  gotoCollectEditPage() {
    this.navCtrl.push(CollectEditPage);
  }


  //
  //
  gotoCollectMemberPage() {
    this.navCtrl.push(CollectMemberPage);
  }
}
