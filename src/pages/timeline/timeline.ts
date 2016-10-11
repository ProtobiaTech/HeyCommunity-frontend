import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';
import { UtilityComponent } from '../../pages/component/utility';

import { AuthenticateService } from '../../services/authenticate.service';
import { TimelineService } from '../../services/timeline.service';
import { UserService } from '../../services/user.service';

import { TimelineDetailPage } from '../../pages/timeline/timeline-detail';
import { TimelineCreatePage } from '../../pages/timeline/timeline-create';


@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  //
  // constructor
  constructor(
    public helper: Helper,
    public utilityComp: UtilityComponent,
    public authComp: AuthenticateComponent,
    public timelineService: TimelineService,
    public userService: UserService,
    public authService: AuthenticateService,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    this.timelineService.getTimelinesFromStorage();
  }


  //
  // ion view did enter
  ionViewDidLoad() {
    this.timelineService.index();

    //
    this.userService.getUser().then(data => {
      this.authService.logIn(data);
    }, data => {
      this.authService.logOut();
    });
  }


  //
  // goto timeline detail page
  gotoTimelineDetailPage(timeline, index) {
    this.navCtrl.push(TimelineDetailPage, {timeline: timeline, timelineIndex: index});
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline) {
    if (this.authService.isAuth) {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        timeline.is_like = newTimeline.is_like;
        timeline.like_num = newTimeline.like_num;
      });
    } else {
      this.authComp.presentAuthModal();
    }
  }


  //
  // present timeline create modal
  presentTimelineCreateModal() {
    if (this.authService.isAuth) {
      let self = this;

      let page = TimelineCreatePage;
      let params = {}
      let callback = function() {
      }

      this.utilityComp.presentModal(page, params, callback);
    } else {
      this.authComp.presentAuthModal();
    }
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
