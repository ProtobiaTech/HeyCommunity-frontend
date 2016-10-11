import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';
import { UtilityComponent } from '../../pages/component/utility';

import { AuthenticateService } from '../../services/authenticate.service';
import { TimelineService } from '../../services/timeline.service';

import { Timeline } from '../../models/timeline.model';
import { TimelineCommentPage } from '../../pages/timeline/timeline-comment';


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
    public helper: Helper,
    public utilityComp: UtilityComponent,
    public authComp: AuthenticateComponent,
    public authService: AuthenticateService,
    public timelineService: TimelineService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {
    this.timelineIndex = this.navParams.data.timelineIndex;
    this.timeline = this.navParams.data.timeline;
  }


  //
  // present action sheet
  presentActionSheet() {
    let title = 'Operations';

    let btnDestructive = {
      text: 'Destructive',
      role: 'destructive',
      handler: () => {
        console.log('Destructive clicked');
      }
    }

    let buttons = [{
      text: 'Report',
      handler: () => {
        console.log('Report clicked');
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];

    if (this.authService.isAuth && (this.authService.userInfo.id === this.timeline.user_id || this.authService.userInfo.is_admin)) {
      buttons.unshift(btnDestructive);
    }

    this.utilityComp.presentActionSheet(title, buttons);
  }


  //
  // present timeline comment modal
  presentTimelineCommentModal() {
    if (this.authService.isAuth) {
      let self = this;

      let page = TimelineCommentPage;
      let params = {timeline: this.timeline, timelineIndex: this.timelineIndex};
      let callback = function() {
        self.timeline = self.timelineService.timelines[self.timelineIndex];
      }

      this.utilityComp.presentModal(page, params, callback);
    } else {
      this.authComp.presentAuthModal();
    }
  }
}
