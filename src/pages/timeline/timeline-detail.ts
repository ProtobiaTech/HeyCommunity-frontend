import { Component } from '@angular/core';
import { NavController, Nav, NavParams, ActionSheetController, ModalController } from 'ionic-angular';

import { Helper } from '../../other/helper';

import { Timeline } from '../../models/timeline.model';
import { TimelineCommentPage } from '../../pages/timeline/timeline-comment';


@Component({
  selector: 'page-timeline-detail',
  templateUrl: 'timeline-detail.html',
})
export class TimelineDetailPage {
  timeline: Timeline;


  //
  // constructor
  constructor(
    public helper: Helper,
    public navCtrl: NavController,
    public nav: Nav,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {
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
    let modal = this.modalCtrl.create(TimelineCommentPage);
    modal.present();
  }
}
