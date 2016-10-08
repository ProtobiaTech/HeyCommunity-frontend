import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Timeline } from '../../models/timeline.model';


@Component({
  selector: 'page-timeline',
  templateUrl: 'me-timeline.html'
})
export class MeTimelinePage {
  timelines: Timeline[];


  //
  // constructor
  constructor(public navCtrl: NavController) {
    this.timelines = [];
  }

}
