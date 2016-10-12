import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';
import { UtilityComponent } from '../../pages/component/utility';

import { TimelineService } from '../../services/timeline.service';
import { AuthenticateService } from '../../services/authenticate.service';

import { Timeline } from '../../models/timeline.model';
import { TimelineDetailPage } from '../../pages/timeline/timeline-detail';


@Component({
  selector: 'page-timeline',
  templateUrl: 'me-timeline.html'
})
export class MeTimelinePage {
  timelines: Timeline[];


  //
  // constructor
  constructor(
    public helper: Helper,
    public utilityComp: UtilityComponent,
    public authComp: AuthenticateComponent,
    public timelineService: TimelineService,
    public authService: AuthenticateService,
    public navCtrl: NavController
  ) {
    this.timelines = [];

    this.timelineService.timelines.forEach(function(timeline) {
      if (timeline.user_id === this.authService.userInfo.id) {
        this.timelines = this.timelines.concat(timeline);
      }
    }, this)
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline) {
    if (this.authService.isAuth) {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        timeline.is_like = newTimeline.is_like;
        timeline.like_num = newTimeline.like_num;
      });
    } else {
      this.authComp.presentAuthModal();
    }
  }


  //
  // goto timeline detail page
  gotoTimelineDetailPage(timeline, index) {
    this.navCtrl.push(TimelineDetailPage, {timeline: timeline, timelineIndex: index});
  }


}
