import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Collect } from '../models/collect.model';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../../timeline/services/timeline.service';

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
    public timelineService: TimelineService,
    public heyApp: AppService,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.collect = this.navParams.data.collect;
    console.log(this.collect);
  }


  //
  // ion view did enter
  ionViewDidEnter() {
    // get timelines
    this.timelineService.index();
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
