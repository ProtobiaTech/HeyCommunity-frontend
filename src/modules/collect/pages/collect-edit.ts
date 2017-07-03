import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Collect } from '../models/collect.model';

import { AppService } from '../../common/services/app.service';
import { CollectService } from '..//services/collect.service';


@Component({
  selector: 'page-collect-edit',
  templateUrl: 'collect-edit.html'
})
export class CollectEditPage {
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
  //
  updateHandle() {
    this.collectService.update(this.collect)
    .then(() => {
      this.navCtrl.pop();
    });
  }
}
