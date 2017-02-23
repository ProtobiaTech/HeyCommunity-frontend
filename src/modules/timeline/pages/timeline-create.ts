import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ImagePicker, Transfer, Camera } from 'ionic-native';

import { Timeline } from '../models/timeline.model';
import { TimelineImg } from '../models/timelineImg.model';

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
  imgs: TimelineImg[] = [];

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
    console.log(this.imgIdArr, ngForm.value.content, this.video);
    if (this.imgIdArr.length || ngForm.value.content || this.video) {
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
    } else {
      let params = {
        title: this.heyApp.translateService.instant('Alert'),
        subTitle: this.heyApp.translateService.instant('timeline.Please share something that makes sense'),
      }

      this.heyApp.utilityComp.presentAlter(params);
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
  // upload imgs by native camera
  uploadImgsByNativeCamera(type) {
    let options = {
      quality: 60,
      saveToPhotoAlbum: true,
      sourceType: 1,
      mediaType: 0,
      targetWidth: 1200,
      targetHeight: 1600,
    };
    if (type === 'library') {
      options.quality = 100;
      options.saveToPhotoAlbum = false;
      options.sourceType = 0;
      options.mediaType = 2;
    }

    Camera.getPicture(options).then((result) => {
      this.waiting = true;

      console.log('the file', result);
      this.uploadFileByFileTransfer(result, this.timelineService.timelineStoreImgAPI);
    }, (err) => {
      console.log('Camera getPictures err', err);
    });
  }


  //
  // upload imgs by native library
  uploadImgsByNativeLibrary() {
    let options = {
      width: 1200,
      height: 1600,
    };
    ImagePicker.getPictures(options).then((results) => {
      this.waiting = true;

      for (var i = 0; i < results.length; i++) {
        this.uploadFileByFileTransfer(results[i], this.timelineService.timelineStoreImgAPI);
      }
    }, (err) => {
      console.log('ImagePIcker getPictures err', err);
    });
  }

  //
  // upload imgs by file transfer
  uploadFileByFileTransfer(file, api) {
    const fileTransfer = new Transfer();
    let options: any;
    options = {
       fileKey: 'uploads[]',
       fileName: file.replace(/^.*[\\\/]/, ''),
       headers: {},
    }

    fileTransfer.upload(file, api, options)
    .then((ret) => {
      this.waiting = false;

      // merge imgs
      this.mergeImgs(JSON.parse((<any> ret).response).imgs);
    }, (err) => {
      this.waiting = false;
    })
  }


  //
  // upload imgs
  uploadImgs(event) {
    this.waiting = true;
    let files = event.srcElement.files;

    this.heyApp.fileUploadService.upload(this.timelineService.timelineStoreImgAPI, files).then(data => {
      this.waiting = false;

      // merge imgs
      this.mergeImgs(data.imgs);
    }, () => {
      this.waiting = false;
    });
  }


  //
  // merge Imgs
  mergeImgs(imgs) {
    this.video = null;

    for (let i = 0; i < imgs.length; i++) {
      this.imgIdArr = this.imgIdArr.concat(imgs[i]['id']);
      this.imgs = this.imgs.concat(imgs[i]);
    }
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
