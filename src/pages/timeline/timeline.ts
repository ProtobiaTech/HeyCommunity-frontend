import { Component } from '@angular/core';
import { NavController, Nav, ModalController } from 'ionic-angular';

import { TimelineDetailPage } from '../../pages/timeline/timeline-detail';
import { TimelineCreatePage } from '../../pages/timeline/timeline-create';
import { Timeline } from '../../models/timeline';
import { TimelineService } from '../../services/timeline';


@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  //
  // constructor
  constructor(
    public timelineService: TimelineService,
    public navCtrl: NavController,
    public nav: Nav,
    public modalCtrl: ModalController
  ) {
  }


  //
  // ion view did enter
  ionViewDidEnter() {
    this.timelineService.getTimelines();
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
    let params: any = {
      id: this.timelineService.timelines[0].id,
    }

    this.timelineService.refresh(params)
    .then(timelines => {
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let params: any = {
      id: this.timelineService.timelines[this.timelineService.timelines.length - 1].id,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      infiniteScroll.complete();
    });
  }
}
