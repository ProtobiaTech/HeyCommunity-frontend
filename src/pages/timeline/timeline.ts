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
    public authComp: AuthenticateComponent,
    public utilityComp: UtilityComponent,
    public timelineService: TimelineService,
    public userService: UserService,
    public authService: AuthenticateService,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
  }


  //
  // ion view did enter
  ionViewDidLoad() {
    this.timelineService.getTimelines();

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
      let modal = this.modalCtrl.create(TimelineCreatePage);
      modal.present();
    } else {
      this.authComp.presentAuthModal();
    }
  }


  //
  // Refresh
  doRefresh(refresher) {
    this.utilityComp.presentLoading();

    let params: any = {
      id: this.timelineService.timelines[0].id,
    }

    this.timelineService.refresh(params)
    .then(timelines => {
      this.utilityComp.dismissLoading();
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    this.utilityComp.presentLoading();

    let params: any = {
      id: this.timelineService.timelines[this.timelineService.timelines.length - 1].id,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      this.utilityComp.dismissLoading();
      infiniteScroll.complete();
    });
  }
}
