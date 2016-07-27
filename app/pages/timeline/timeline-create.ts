import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';


@Component({
  templateUrl: 'build/pages/timeline/timeline-create.html',
  providers: [
    TimelineService,
  ],
})
export class TimelineCreatePage {
  newTimeline: {content?: string} = {};


  //
  // constructor
  constructor(
    private nav: NavController,
    private timelineService: TimelineService
  ) {
  }


  //
  // timeline create handle
  timelineCreateHandle(ngForm) {
    let params: any = {
      content: ngForm.value.content
    };

    this.timelineService.store(params)
      .then(newTimeline => {
        this.nav.pop();
        console.log(newTimeline);
      });
  }
}
