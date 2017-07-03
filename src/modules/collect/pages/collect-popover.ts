import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams, ViewController } from 'ionic-angular';

import { Collect } from '../models/collect.model';

import { AppService } from '../../common/services/app.service';
import { CollectService } from '..//services/collect.service';

import { CollectEditPage } from '../../collect/pages/collect-edit';


@Component({
  selector: 'page-collect-popover',
  templateUrl: 'collect-popover.html'
})
export class CollectPopoverPage {
  collect: Collect;

  //
  // constructor
  constructor(
    public collectService: CollectService,
    public heyApp: AppService,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    this.collect = this.navParams.data.collect;
  }


  //
  //
  destoryHandle() {
    this.viewCtrl.dismiss();
    /*
    this.collectService.destroy(this.collect)
    .then(() => {
      this.viewCtrl.dismiss();
    });
    */
  }


  //
  //
  gotoCollectEditPage() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(CollectEditPage, {collect: this.collect});
  }
}
