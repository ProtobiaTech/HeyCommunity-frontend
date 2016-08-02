import {Component} from '@angular/core';
import {NavController, ActionSheet, NavParams} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';


@Component({
  templateUrl: 'build/pages/timeline/timeline-detail.html',
  providers: [
    TimelineService,
  ],
})
export class TimelineDetailPage {
  timeline: Timeline;
  timelines: Timeline[];
  newComment: {content?: string, timeline_id?: number} = {};


  //
  // constructor
  constructor(
    private navParams: NavParams,
    private nav: NavController,
    public timelineService: TimelineService
  ) {
    this.timeline = navParams.data.timeline;
    this.timelines = navParams.data.timelines;
    this.newComment.timeline_id = this.timeline.id;
  }


  //
  // on init
  ngOnInit() {
  }


  //
  // destroy
  destroy() {
    this.timelineService.destroy(this.timeline)
    .then((ret) => {
      let index = this.timelines.indexOf(this.timeline);
      this.timelines.splice(index, 1);

      this.nav.pop();
    });
  }


  //
  // send comment handler
  sendCommentHandler() {
    let params: Object = {
      timeline_id: this.newComment.timeline_id,
      content: this.newComment.content,
    }

    this.timelineService.storeComment(params)
    .then((ret) => {
      this.newComment.content = '';

      let index = this.timelines.indexOf(this.timeline);
      for (let key in this.timelines[index]) {
        this.timelines[index][key] = ret[key];
      }
    });
  }


  //
  // show action sheet
  showActionSheet() {
    let actionSheet = ActionSheet.create({
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.destroy();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
