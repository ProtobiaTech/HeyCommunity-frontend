import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../services/timeline.service';

import { TimelineDetailPage } from './timeline-detail';
import { TimelineCreatePage } from './timeline-create';


@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  //
  // constructor
  constructor(
    public timelineService: TimelineService,
    public heyApp: AppService,
    public navCtrl: NavController,
  ) {
    console.log('Hey Timeline ~');

    this.timelineService.getTimelinesFromStorage();
  }


  //
  // ion view did enter
  ionViewDidEnter() {
    // get timelines
    this.timelineService.index();
  }


  //
  // goto timeline detail page
  gotoTimelineDetailPage(timeline, index) {
    this.navCtrl.push(TimelineDetailPage, {timeline: timeline, timelineIndex: index});
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline) {
    if (this.heyApp.authService.authOrLogin()) {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        timeline.is_like = newTimeline.is_like;
        timeline.like_num = newTimeline.like_num;
      });
    }
  }


  //
  // present timeline create modal
  presentTimelineCreateModal() {
    if (this.heyApp.authService.authOrLogin()) {
      let page = TimelineCreatePage;
      let params = {}
      let callback = function() {
      }

      this.heyApp.utilityComp.presentModal(page, params, callback);
    }
  }


  //
  //
  videoPlay(event) {
    if (event.srcElement.paused) {
      event.srcElement.play();
    } else {
      event.srcElement.pause();
    }
  }


  //
  // Refresh
  doRefresh(refresher) {
    let timeline = this.timelineService.timelines[0];
    let params: any = {
      id: timeline ? timeline.id : 0,
    }

    this.timelineService.refresh(params)
    .then(timelines => {
      refresher.complete();
    }, ret => {
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let length = this.timelineService.timelines.length;
    let params: any = {
      id: length ? this.timelineService.timelines[length - 1].id : 0,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      infiniteScroll.complete();
    }, ret => {
      infiniteScroll.complete();
    });
  }
}
