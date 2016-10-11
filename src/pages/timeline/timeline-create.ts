import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, Nav } from 'ionic-angular';

import { UtilityComponent } from '../../pages/component/utility';

import { TimelineService } from '../../services/timeline.service';

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

  newTimeline: {content?: string} = {};

  //
  imgs: any;

  //
  imgIdArr: number[] = [];

  timeline: Timeline;


  //
  // constructor
  constructor(
    public utilityComp: UtilityComponent,
    public timelineService: TimelineService,
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
  // timeline create handler
  timelineCreateHandler(ngForm) {
    this.utilityComp.presentLoading();

    let data: any = {
      content: ngForm.value.content,
      imgs: JSON.stringify(this.imgIdArr),
    };

    this.timelineService.store(data)
    .then((newTimeline: Timeline) => {
      this.utilityComp.dismissLoading();
      this.dismiss();
    });
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
