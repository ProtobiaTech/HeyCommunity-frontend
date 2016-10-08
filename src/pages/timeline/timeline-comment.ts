import { Component } from '@angular/core';
import { NavController, ViewController, Nav, NavParams } from 'ionic-angular';

import { Timeline } from '../../models/timeline.model';


@Component({
  selector: 'page-timeline-comment',
  templateUrl: 'timeline-comment.html',
  providers: [
    Nav,
  ],
})
export class TimelineCommentPage {
  timeline: Timeline;


  //
  // constructor
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public nav: Nav,
    public navParams: NavParams
  ) {
    this.timeline = this.navParams.data.timeline;
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
