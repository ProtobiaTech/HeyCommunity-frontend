import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, Nav } from 'ionic-angular';

import { Timeline } from '../../models/timeline.model';


@Component({
  selector: 'page-timeline-create',
  templateUrl: 'timeline-create.html',
  providers: [
    Nav,
  ],
})
export class TimelineCreatePage {
  @ViewChild('inputImgs') inputImgsEl;

  timeline: Timeline;


  //
  // constructor
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  }


  //
  // select imgs
  selectImgs() {
    this.inputImgsEl.nativeElement.click();
  }


  //
  // upload imgs
  uploadImgs(event) {
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
