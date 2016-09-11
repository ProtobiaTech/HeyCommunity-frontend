import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Helper} from '../../other/helper.component';
import {Common} from '../../other/common.component';
import {Timeline} from '../../models/timeline.model';
import {FileUploadService} from '../../services/fileUpload.service';
import {TimelineService} from '../../services/timeline.service';


@Component({
  templateUrl: 'build/pages/timeline/timeline-create.html',
  providers: [
    TimelineService,
    FileUploadService,
    Common,
  ],
})
export class TimelineCreatePage {
  @ViewChild('inputImgs') inputImgsEl;

  newTimeline: {content?: string} = {};

  //
  imgs: any;

  //
  imgIdArr: number[] = [];


  //
  // constructor
  constructor(
    private nav: NavController,
    private helper: Helper,
    private common: Common,
    private navParams: NavParams,
    private fileUploadService: FileUploadService,
    private timelineService: TimelineService
  ) {
  }


  //
  // timeline create handler
  timelineCreateHandler(ngForm) {
    this.common.openLoadingModal();

    let data: any = {
      content: ngForm.value.content,
      imgs: JSON.stringify(this.imgIdArr),
    };

    this.timelineService.store(data)
    .then((newTimeline: Timeline) => {
      this.common.dismissLoadingModal();
      this.nav.pop();
    });
  }


  //
  //
  selectImgs() {
    this.inputImgsEl.nativeElement.click();
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
      }
    });
  }
}
