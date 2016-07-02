import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {TimelineCreatePage} from '../timeline-create/timeline-create';

@Component({
  templateUrl: 'build/pages/timeline/timeline.html'
})
export class TimelinePage {
  constructor(
    private navController: NavController
  ) {
  }

  //
  // go to create timeline page
  gotoTimelineCreatePage() {
    this.navController.push(TimelineCreatePage);
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
