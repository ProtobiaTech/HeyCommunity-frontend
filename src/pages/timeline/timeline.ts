import { Component } from '@angular/core';
import { NavController, Nav, ModalController } from 'ionic-angular';

import { TimelineDetailPage } from '../../pages/timeline/timeline-detail';
import { TimelineCreatePage } from '../../pages/timeline/timeline-create';
import { Timeline } from '../../models/timeline';
import { TIMELINES } from '../../mocks/timelines';


@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  timelines: Timeline[];

  //
  // constructor
  constructor(
    public navCtrl: NavController,
    public nav: Nav,
    public modalCtrl: ModalController
  ) {
    this.timelines = TIMELINES;


    console.log(this.timelines);
  }


  //
  // goto timeline detail page
  gotoTimelineDetailPage(timeline) {
    this.nav.push(TimelineDetailPage, {timeline: timeline});
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline) {
  }


  //
  // present timeline create modal
  presentTimelineCreateModal() {
    let modal = this.modalCtrl.create(TimelineCreatePage);
    modal.present();
  }


  //
  // Refresh
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
