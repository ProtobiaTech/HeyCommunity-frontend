import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';

import {TimelineCreatePage} from '../timeline-create/timeline-create';


@Component({
  templateUrl: 'build/pages/timeline/timeline.html',
  providers: [
    TimelineService,
  ]
})
export class TimelinePage {
  constructor(
    private navController: NavController,
    private timelineService: TimelineService
  ) {
  }

  timelines: Timeline[];

  ngOnInit() {
    this.timelineService.getTimelines()
      .then(timelines => this.timelines = timelines);
  }
  //
  // go to create timeline page
  gotoTimelineCreatePage() {
    this.navController.push(TimelineCreatePage);
    console.log(this.timelines)
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
