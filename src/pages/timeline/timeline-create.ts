import { Component, Renderer } from '@angular/core';
import { NavController, ViewController, Nav, Events } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { Helper } from '../../other/helper';
import { UtilityComponent } from '../../pages/component/utility';

import { TimelineService } from '../../services/timeline.service';
import { FileUploadService } from '../../services/fileUpload.service';

import { Timeline } from '../../models/timeline.model';


@Component({
  selector: 'page-timeline-create',
  templateUrl: 'timeline-create.html',
  providers: [
    Nav,
    FileUploadService,
  ],
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
    public events: Events,
    public renderer: Renderer,
    public helper: Helper,
    public utilityComp: UtilityComponent,
    public translateService: TranslateService,
    public timelineService: TimelineService,
    public fileUploadService: FileUploadService,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  }


  //
  // timeline create handler
  timelineCreateHandler(ngForm) {
    if (this.waiting) {
      let params = {
        title: this.translateService.instant('Waiting'),
        subTitle: this.translateService.instant('Waiting For Upload Images Or Video'),
      }

      this.utilityComp.presentAlter(params);
    } else {
      this.utilityComp.presentLoading();

      let data: any = {
        content: ngForm.value.content,
        imgs: JSON.stringify(this.imgIdArr),
        video: this.video ? this.video.id : null,
      };

      this.timelineService.store(data)
      .then((newTimeline: Timeline) => {
        this.utilityComp.dismissLoading();
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

    this.fileUploadService.upload(this.timelineService.timelineStoreImgAPI, files).then(data => {
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

    this.fileUploadService.upload(this.timelineService.timelineStoreVideoAPI, files).then(data => {
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
