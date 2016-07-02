import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/timeline/timeline-detail.html'
})
export class TimelineDetailPage {
  timeline: any;


  //
  // constructor
  constructor(
    private navParams: NavParams
  ) {
    this.timeline = navParams.data;
  }


  //
  // on init
  ngOnInit() {
    console.log(this.timeline);
  }
}
