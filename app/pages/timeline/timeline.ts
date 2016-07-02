import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';

import {TimelineCreatePage} from '../timeline/timeline-create';
import {TimelineDetailPage} from '../timeline/timeline-detail';


@Component({
  templateUrl: 'build/pages/timeline/timeline.html',
  providers: [
    TimelineService,
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
  // Refresh
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 800);
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
