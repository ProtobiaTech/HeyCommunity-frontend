import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Timeline } from '../models/timeline.model';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../services/timeline.service';

import { TimelineCommentPage } from './timeline-comment';


@Component({
  selector: 'page-timeline-detail',
  templateUrl: 'timeline-detail.html',
})
export class TimelineDetailPage {
  timeline: Timeline;
  timelineIndex: number;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public timelineService: TimelineService,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.timelineIndex = this.navParams.data.timelineIndex;
    this.timeline = this.navParams.data.timeline;
  }


  //
  // destroy
  destroy() {
    this.heyApp.utilityComp.presentLoading();

    this.timelineService.destroy(this.timeline)
    .then((ret) => {
      this.heyApp.utilityComp.dismissLoading();

      let index = this.timelineService.timelines.indexOf(this.timeline);
      this.timelineService.timelines.splice(index, 1);

      this.navCtrl.pop();
    }, (ret) => {
      this.heyApp.utilityComp.dismissLoading();
      let content = JSON.parse(ret._body);
      this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('Alter'), subTitle: content});
    });
  }


  //
  // present action sheet
  presentActionSheet() {
    let title = this.heyApp.translateService.instant('Operations');

    let btnDestructive = {
      text: this.heyApp.translateService.instant('Destructive'),
      role: 'destructive',
      handler: () => {
        let self = this;
        self.destroy();
      }
    }

    let buttons = [{
      text: this.heyApp.translateService.instant('Report'),
      handler: () => {
        this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('Report'), subTitle: this.heyApp.translateService.instant('Thanks For Your Report')});
      }
    }, {
      text: this.heyApp.translateService.instant('Cancel'),
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];

    if (this.heyApp.authService.isAuth && (this.heyApp.authService.userInfo.id === this.timeline.user_id || this.heyApp.authService.userInfo.is_admin)) {
      buttons.unshift(btnDestructive);
    }

    this.heyApp.utilityComp.presentActionSheet(title, buttons);
  }


  //
  // present timeline comment modal
  presentTimelineCommentModal(timelineComment?) {
    if (this.heyApp.authService.authOrLogin()) {
      let self = this;

      let page = TimelineCommentPage;
      let params = {
        timeline: this.timeline,
        timelineIndex: this.timelineIndex,
        timelineComment: timelineComment
      };
      let callback = function() {
        self.timeline = self.timelineService.timelines[self.timelineIndex];
      }

      this.heyApp.utilityComp.presentModal(page, params, callback);
    }
  }
}
