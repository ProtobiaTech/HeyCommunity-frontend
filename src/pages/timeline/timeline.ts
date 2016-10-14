import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NavController, ModalController } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { AuthenticateComponent } from '../../pages/component/authenticate';
import { UtilityComponent } from '../../pages/component/utility';

import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';
import { NoticeService } from '../../services/notice.service';
import { TimelineService } from '../../services/timeline.service';

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
    public events: Events,
    public helper: Helper,
    public utilityComp: UtilityComponent,
    public authComp: AuthenticateComponent,
    public timelineService: TimelineService,
    public userService: UserService,
    public noticeService: NoticeService,
    public authService: AuthenticateService,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    console.log('Hey Timeline ~');

    // get auth user
    this.authService.getUser();

    // get timelines from storage
    this.timelineService.getTimelinesFromStorage();
  }


  //
  // ion view did enter
  ionViewDidLoad() {
    // get user
    this.userService.getUser().then(data => {
      this.authService.logIn(data);

      // get notice
      this.noticeService.getIndex();
    }, data => {
      this.authService.logOut();
    });

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
    let params: any = {
      id: this.timelineService.timelines[0].id,
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
    let params: any = {
      id: this.timelineService.timelines[this.timelineService.timelines.length - 1].id,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      infiniteScroll.complete();
    }, ret => {
      infiniteScroll.complete();
    });
  }
}
