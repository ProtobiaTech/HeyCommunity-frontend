import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Timeline } from '../../timeline/models/timeline.model';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../../timeline/services/timeline.service';

import { TimelineDetailPage } from '../../timeline/pages/timeline-detail';


@Component({
  selector: 'page-timeline',
  templateUrl: 'my-timeline.html'
})
export class MyTimelinePage {
  timelines: Timeline[];


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public timelineService: TimelineService,
    public navCtrl: NavController
  ) {
    this.timelines = [];

    this.timelineService.timelines.forEach(function(timeline) {
      if (timeline.user_id === this.heyApp.authService.userInfo.id) {
        this.timelines = this.timelines.concat(timeline);
      }
    }, this)
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline) {
    if (this.heyApp.authService.authOrLogin()) {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        timeline.is_like = newTimeline.is_like;
        timeline.like_num = newTimeline.like_num;
      });
    }
  }


  //
  // goto timeline detail page
  gotoTimelineDetailPage(timeline, index) {
    this.navCtrl.push(TimelineDetailPage, {timeline: timeline, timelineIndex: index});
  }


}
