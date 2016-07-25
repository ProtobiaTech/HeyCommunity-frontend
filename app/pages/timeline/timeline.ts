import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';

import {TimelineCreatePage} from '../timeline/timeline-create';
import {TimelineDetailPage} from '../timeline/timeline-detail';

import {MomentPipe, TimeagoPipe} from '../../other/moment.pipe';


@Component({
  templateUrl: 'build/pages/timeline/timeline.html',
  providers: [
    TimelineService,
  ],
  pipes: [
    TimeagoPipe
  ]
})
export class TimelinePage {
  timelines: Timeline[];


  //
  // constructor
  constructor(
    private navController: NavController,
    private timelineService: TimelineService
  ) {
  }


  //
  // on init
  ngOnInit() {
    this.timelineService.getTimelines()
      .then(timelines => this.timelines = timelines);

  }


  //
  // go to create timeline page
  gotoTimelineCreatePage() {
    this.navController.push(TimelineCreatePage);
  }


  //
  // go to timeline detail
  gotoTimelineDetailPage(timeline: Timeline) {
    this.navController.push(TimelineDetailPage, timeline);
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline: Timeline) {
    this.timelineService.setLike(timeline)
      .then(newTimeline => {
        for (let key in newTimeline) {
          timeline[key] = newTimeline[key];
        }
      });
  }


  //
  // Refresh
  doRefresh(refresher) {

    let params: any = {
      id: this.timelines[0].id,
    }
    this.timelineService.refresh(params)
      .then(timelines => {
        this.timelines = timelines.concat(this.timelines);
        refresher.complete();
      });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let params: any = {
      id: this.timelines[this.timelines.length - 1].id,
    }
    this.timelineService.infinite(params)
      .then(timelines => {
        this.timelines = this.timelines.concat(timelines);
        infiniteScroll.complete();
      });
  }
}
