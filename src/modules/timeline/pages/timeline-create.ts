import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { Timeline } from '../models/timeline.model';

import { AppService } from '../../common/services/app.service';
import { TimelineService } from '../services/timeline.service';


@Component({
  selector: 'page-timeline-create',
  templateUrl: 'timeline-create.html',
})
export class TimelineCreatePage {
  newTimeline: {content?: string} = {};

  //
  waiting: boolean = false;

  //
  imgs: any;

  //
  video: any;

  //
  imgIdArr: number[] = [];

  timeline: Timeline;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public timelineService: TimelineService,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  }


  //
  // timeline create handler
  timelineCreateHandler(ngForm) {
    if (this.waiting) {
      let params = {
        title: this.heyApp.translateService.instant('Waiting'),
        subTitle: this.heyApp.translateService.instant('Waiting For Upload Images Or Video'),
      }

      this.heyApp.utilityComp.presentAlter(params);
    } else {
      this.heyApp.utilityComp.presentLoading();

      let data: any = {
        content: ngForm.value.content,
        imgs: JSON.stringify(this.imgIdArr),
        video: this.video ? this.video.id : null,
      };

      this.timelineService.store(data)
      .then((newTimeline: Timeline) => {
        this.heyApp.utilityComp.dismissLoading();
        this.dismiss();
      });
    }
  }


  //
  // video play
  videoPlay(event) {
    if (event.srcElement.paused) {
      event.srcElement.play();
    } else {
      event.srcElement.pause();
    }
  }


  //
  // upload imgs
  uploadImgs(event) {
    this.waiting = true;
    let files = event.srcElement.files;

    this.heyApp.fileUploadService.upload(this.timelineService.timelineStoreImgAPI, files).then(data => {
      this.waiting = false;
      this.imgs = data.imgs;

      this.imgIdArr = [];     // @todo reset imgIdArr
      for (let i = 0; i < this.imgs.length; i++) {
        this.imgIdArr = this.imgIdArr.concat(this.imgs[i]['id']);
        this.video = null;
      }
    }, () => {
      this.waiting = false;
    });
  }


  //
  // upload video
  uploadVideo(event) {
    this.waiting = true;
    let files = event.srcElement.files;
    this.video = null;

    this.heyApp.fileUploadService.upload(this.timelineService.timelineStoreVideoAPI, files).then(data => {
      this.waiting = false;
      this.imgs = data.imgs;
      this.video = data;
      this.imgIdArr = [];
    }, () => {
      this.waiting = false;
    });
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }


}
