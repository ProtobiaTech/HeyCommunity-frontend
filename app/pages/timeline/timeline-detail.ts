import {Component} from '@angular/core';
import {NavController, ActionSheetController, NavParams} from 'ionic-angular';

import {Auth} from '../../other/auth.component';
import {Helper} from '../../other/helper.component';
import {Common} from '../../other/common.component';
import {AuthModal} from '../../other/authModal.component';
import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';
import {MomentPipe, TimeagoPipe} from '../../other/moment.pipe';


@Component({
  templateUrl: 'build/pages/timeline/timeline-detail.html',
  providers: [
    Common,
    AuthModal,
  ],
  pipes: [
    TimeagoPipe,
    MomentPipe,
  ]
})
export class TimelineDetailPage {
  timeline: Timeline;
  timelineIndex: number;
  newComment: {content?: string, timeline_id?: number} = {};


  //
  // constructor
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private common: Common,
    private authModal: AuthModal,
    private auth: Auth,
    private helper: Helper,
    private actionSheetCtrl: ActionSheetController,
    private timelineService: TimelineService
  ) {
    // this.timeline = navParams.data.timeline;
    this.timelineIndex = navParams.data.index;
    this.timeline = this.timelineService.timelines[this.timelineIndex];
    this.newComment.timeline_id = this.timeline.id;
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
      let index = this.timelineService.timelines.indexOf(this.timeline);
      this.timelineService.timelines.splice(index, 1);

      this.navCtrl.pop();
    });
  }


  //
  // input comment handler
  inputCommentHandler() {
    if (!this.auth.isAuth) {
      this.authModal.openAuthenticateModal();
    }
  }


  //
  // send comment handler
  sendCommentHandler() {
    if (!this.auth.isAuth) {
      this.authModal.openAuthenticateModal();
    } else {
      let params: Object = {
        timeline_id: this.newComment.timeline_id,
        content: this.newComment.content,
      }

      this.timelineService.storeComment(params)
      .then((ret) => {
        this.newComment.content = '';

        this.timelineService.timelines[this.timelineIndex] = ret;
        this.timeline = ret;
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

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Operations',
      buttons: buttons,
    });

    actionSheet.present(actionSheet);
  }
}
