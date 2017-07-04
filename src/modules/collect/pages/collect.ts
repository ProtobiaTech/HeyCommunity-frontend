import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';

import { Collect } from '../models/collect.model';

import { AppService } from '../../common/services/app.service';
import { CollectService } from '..//services/collect.service';

import { CollectEditPage } from '../../collect/pages/collect-edit';
import { CollectMemberPage } from '../../collect/pages/collect-member';
import { CollectPopoverPage } from '../../collect/pages/collect-popover';
import { TimelineCreatePage } from '../../timeline/pages/timeline-create';


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
    public popoverCtrl: PopoverController,
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
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CollectPopoverPage, {collect: this.collect});
    popover.present({
      ev: myEvent
    });
  }


  //
  // present timeline create modal
  presentTimelineCreateModal() {
    let page = TimelineCreatePage;
    let params = {}
    let callback = function() {
    }

    this.heyApp.utilityComp.presentModal(page, params, callback);
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
