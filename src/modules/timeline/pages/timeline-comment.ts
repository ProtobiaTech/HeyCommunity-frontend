import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Timeline } from '../models/timeline.model';
import { TimelineComment } from '../models/timelineComment.model';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../services/timeline.service';


@Component({
  selector: 'page-timeline-comment',
  templateUrl: 'timeline-comment.html',
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
    public heyApp: AppService,
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
    this.heyApp.utilityComp.presentLoading();

    let params: Object = {
      timeline_id: this.timeline.id,
      timeline_comment_id: this.timelineComment ? this.timelineComment.id : null,
      content: this.newComment.content,
    }

    this.timelineService.storeComment(params)
    .then((ret) => {
      this.heyApp.utilityComp.dismissLoading();

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
