import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Timeline } from '../../models/timeline';
import { TIMELINES } from '../../mocks/timelines';


@Component({
  selector: 'page-timeline',
  templateUrl: 'me-timeline.html'
})
export class MeTimelinePage {
  timelines: Timeline[];


  //
  // constructor
  constructor(public navCtrl: NavController) {
    this.timelines = TIMELINES;
  }

}
