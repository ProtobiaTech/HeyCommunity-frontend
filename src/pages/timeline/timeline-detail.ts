import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';

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
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Operations',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Report',
          handler: () => {
            console.log('Report clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ],
   });

   actionSheet.present();
  }


  //
  // present timeline comment modal
  presentTimelineCommentModal() {
    if (this.authService.isAuth) {
      let modal = this.modalCtrl.create(TimelineCommentPage, {timeline: this.timeline, timelineIndex: this.timelineIndex});

      modal.onDidDismiss(data => {
        this.timeline = this.timelineService.timelines[this.timelineIndex];
      });

      modal.present();
    } else {
      this.authComp.presentAuthModal();
    }
  }
}
