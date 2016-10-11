import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, Nav, NavParams } from 'ionic-angular';

import { UtilityComponent } from '../../pages/component/utility';

import { TimelineService } from '../../services/timeline.service';

import { Timeline } from '../../models/timeline.model';


@Component({
  selector: 'page-timeline-comment',
  templateUrl: 'timeline-comment.html',
  providers: [
    Nav,
  ],
})
export class TimelineCommentPage {
  @ViewChild('inputComment') inputCommentEl;

  timeline: Timeline;
  timelineIndex: number;
  newComment: {content?: string, timeline_id?: number} = {};


  //
  // constructor
  constructor(
    public utilityComp: UtilityComponent,
    public timelineService: TimelineService,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.timeline = this.navParams.data.timeline;
    this.timelineIndex = this.navParams.data.timelineIndex;
  }


  //
  // ionic view did enter
  ionViewDidEnter() {
    console.log(this.inputCommentEl);
    console.log(this.inputCommentEl.nativeElement);
    this.inputCommentEl.setFocus();
  }


  //
  // send comment handler
  sendCommentHandler(form) {
    this.utilityComp.presentLoading();

    let params: Object = {
      timeline_id: this.timeline.id,
      content: this.newComment.content,
    }

    this.timelineService.storeComment(params)
    .then((ret) => {
      this.utilityComp.dismissLoading();

      this.newComment.content = '';
      this.timelineService.timelines[this.timelineIndex] = ret;

      this.dismiss();
    });
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
