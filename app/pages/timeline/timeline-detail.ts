import {Component} from '@angular/core';
import {NavController, ActionSheet, NavParams} from 'ionic-angular';

import {Auth} from '../../other/auth.component';
import {Common} from '../../other/common.component';
import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';
import {MomentPipe, TimeagoPipe} from '../../other/moment.pipe';


@Component({
  templateUrl: 'build/pages/timeline/timeline-detail.html',
  providers: [
    TimelineService,
  ],
  pipes: [
    TimeagoPipe,
    MomentPipe,
  ]
})
export class TimelineDetailPage {
  timeline: Timeline;
  timelines: Timeline[];
  newComment: {content?: string, timeline_id?: number} = {};
  commonOpenModal: Common;


  //
  // constructor
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private auth: Auth,
    public timelineService: TimelineService
  ) {
    this.timeline = navParams.data.timeline;
    this.timelines = this.timelineService.timelines;
    this.newComment.timeline_id = this.timeline.id;
    this.commonOpenModal = new Common(this.navCtrl);
  }


  //
  // on init
  ngOnInit() {
  }


  //
  // destroy
  destroy() {
    this.timelineService.destroy(this.timeline)
    .then((ret) => {
      let index = this.timelines.indexOf(this.timeline);
      this.timelines.splice(index, 1);

      this.navCtrl.pop();
    });
  }


  //
  // input comment handler
  inputCommentHandler() {
    if (!this.auth.isAuth) {
      // this.commonOpenModal.openUserLogInModal();
    }
  }


  //
  // send comment handler
  sendCommentHandler() {
    if (!this.auth.isAuth) {
      this.commonOpenModal.openUserLogInModal();
    } else {
      let params: Object = {
        timeline_id: this.newComment.timeline_id,
        content: this.newComment.content,
      }

      this.timelineService.storeComment(params)
      .then((ret) => {
        this.newComment.content = '';

        let index = this.timelines.indexOf(this.timeline);
        for (let key in this.timelines[index]) {
          this.timelines[index][key] = ret[key];
        }
      });
    }
  }


  //
  // show action sheet
  showActionSheet() {
    let buttons = [];

    let btnDestructive = {
      text: 'Destructive',
      role: 'destructive',
      handler: () => {
        this.destroy();
      }
    }

    let btnCancel = {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      }
    }

    if (this.auth.isAuth && this.auth.userInfo.id === this.timeline.user_id) {
      buttons = [btnDestructive, btnCancel];
    } else {
      buttons = [btnCancel];
    }

    //
    let actionSheet = ActionSheet.create({
      buttons: buttons,
    });

    this.navCtrl.present(actionSheet);
  }
}
