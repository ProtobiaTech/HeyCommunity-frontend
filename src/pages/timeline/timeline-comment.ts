import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, Nav, NavParams } from 'ionic-angular';

import { UtilityComponent } from '../../pages/component/utility';

import { TimelineService } from '../../services/timeline.service';

import { Timeline } from '../../models/timeline.model';
import { TimelineComment } from '../../models/timelineComment.model';


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
  timelineComment: TimelineComment;
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
    this.timelineComment = this.navParams.data.timelineComment;
  }


  //
  // ionic view did enter
  ionViewDidEnter() {
    this.inputCommentEl.setFocus();
  }


  //
  // send comment handler
  sendCommentHandler(form) {
    this.utilityComp.presentLoading();

    let params: Object = {
      timeline_id: this.timeline.id,
      timeline_comment_id: this.timelineComment ? this.timelineComment.id : null,
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
