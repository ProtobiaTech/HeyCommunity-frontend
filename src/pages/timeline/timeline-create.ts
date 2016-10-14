import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, ViewController, Nav, Events } from 'ionic-angular';

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
  @ViewChild('inputImgs') inputImgsEl;
  @ViewChild('inputVideo') inputVideoEl;

  newTimeline: {content?: string} = {};

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
    public timelineService: TimelineService,
    public fileUploadService: FileUploadService,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  }


  //
  // timeline create handler
  timelineCreateHandler(ngForm) {
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
  //
  selectImgs() {
    this.inputImgsEl.nativeElement.click();
  }


  //
  //
  selectVideo() {
    this.inputVideoEl.nativeElement.click();
  }


  //
  //
  uploadImgs(event) {
    let files = event.srcElement.files;

    this.fileUploadService.upload(this.timelineService.timelineStoreImgAPI, files).then(data => {
      this.imgs = data.imgs;

      this.imgIdArr = [];     // @todo reset imgIdArr
      for (let i = 0; i < this.imgs.length; i++) {
        this.imgIdArr = this.imgIdArr.concat(this.imgs[i]['id']);
        this.video = null;
      }
    });
  }


  //
  //
  uploadVideo(event) {
    let files = event.srcElement.files;
    this.video = null;

    this.fileUploadService.upload(this.timelineService.timelineStoreVideoAPI, files).then(data => {
      this.imgs = data.imgs;
      this.video = data;
      this.imgIdArr = [];
    });
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }


}
