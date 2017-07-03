import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Collect } from '../models/collect.model';

import { AppService } from '../../common/services/app.service';
import { CollectService } from '..//services/collect.service';

import { CollectEditPage } from '../../collect/pages/collect-edit';
import { CollectMemberPage } from '../../collect/pages/collect-member';


@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {
  collect: Collect;

  //
  // constructor
  constructor(
    public collectService: CollectService,
    public heyApp: AppService,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.collect = this.navParams.data.collect;
  }


  //
  // ion view did enter
  ionViewDidEnter() {
    this.collectService.getShow(this.collect.id)
    .then((res) => {
      this.collect = res;
    });
  }


  //
  //
  gotoCollectEditPage() {
    this.navCtrl.push(CollectEditPage, {collect: this.collect});
  }


  //
  //
  gotoCollectMemberPage() {
    this.navCtrl.push(CollectMemberPage, {collect: this.collect});
  }
}
