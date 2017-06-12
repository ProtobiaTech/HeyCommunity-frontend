import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../../timeline/services/timeline.service';

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
    public timelineService: TimelineService,
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
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
