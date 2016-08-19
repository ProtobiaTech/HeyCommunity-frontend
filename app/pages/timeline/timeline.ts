import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';
import {Helper} from '../../other/helper.component';
import {Auth} from '../../other/auth.component';

import {TimelineCreatePage} from '../timeline/timeline-create';
import {TimelineDetailPage} from '../timeline/timeline-detail';
import {UserSignUpPage} from '../user/userSignUp';
import {UserLogInPage} from '../user/userLogIn';

import {MomentPipe, TimeagoPipe} from '../../other/moment.pipe';


@Component({
  templateUrl: 'build/pages/timeline/timeline.html',
  providers: [
    TimelineService,
  ],
  pipes: [
    TimeagoPipe,
    MomentPipe,
  ]
})
export class TimelinePage {
  timelines: Timeline[];
  isAuth: boolean = false;


  //
  // constructor
  constructor(
    private auth: Auth,
    private navCtrl: NavController,
    private timelineService: TimelineService
  ) {
    this.isAuth = this.auth.isAuth;
  }


  //
  // on init
  ngOnInit() {
    this.timelineService.getTimelines()
    .then(timelines => {
      this.timelines = timelines;
    });
  }


  //
  // go to create timeline page
  gotoTimelineCreatePage() {
    this.navCtrl.rootNav.push(TimelineCreatePage, {timelines: this.timelines});
  }


  //
  // go to timeline detail
  gotoTimelineDetailPage(timeline: Timeline) {
    this.navCtrl.rootNav.push(TimelineDetailPage, {timelines: this.timelines, timeline: timeline});
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline: Timeline) {
    if (!this.auth.isAuth) {
      this.showUserLogInModal();
    } else {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        for (let key in newTimeline) {
          timeline[key] = newTimeline[key];
        }
      });
    }
  }


  //
  // show user login modal
  showUserLogInModal() {
    let userLogInModal = Modal.create(UserLogInPage);
    this.navCtrl.present(userLogInModal);
  }


  //
  // Refresh
  doRefresh(refresher) {
    let params: any = {
      id: this.timelines[0].id,
    }

    this.timelineService.refresh(params)
    .then(timelines => {
      this.timelines = timelines.concat(this.timelines);
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let params: any = {
      id: this.timelines[this.timelines.length - 1].id,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      this.timelines = this.timelines.concat(timelines);
      infiniteScroll.complete();
    });
  }
}
