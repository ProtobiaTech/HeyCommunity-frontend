import {Component} from '@angular/core';
import {NavController, ActionSheet, NavParams} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';


@Component({
  templateUrl: 'build/pages/timeline/timeline-detail.html',
  providers: [
    TimelineService,
  ],
})
export class TimelineDetailPage {
  timeline: Timeline;
  timelines: Timeline[];


  //
  // constructor
  constructor(
    private navParams: NavParams,
    private nav: NavController,
    public timelineService: TimelineService
  ) {
    this.timeline = navParams.data.timeline;
    this.timelines = navParams.data.timelines;
  }


  //
  // on init
  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  //
  // destroy
  destroy() {
    this.timelineService.destroy(this.timeline)
    .then((ret) => {
      let index = this.timelines.indexOf(this.timeline);
      this.timelines.splice(index, 1);

      this.nav.pop();
    });
  }


  //
  // show action sheet
  showActionSheet() {
    let actionSheet = ActionSheet.create({
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.destroy();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
