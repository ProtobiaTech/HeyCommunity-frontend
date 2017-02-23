import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../models/user.model';

import { AppService } from '../../common/services/app.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'page-me-profileUpdate',
  templateUrl: 'me-profileUpdate.html',
})
export class MeProfileUpdatePage {
  @ViewChild('inputAvatar') inputAvatarEl;

  //
  item: string;
  isUpdated: string = '';
  userInfo: User;


  //
  //
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.item = this.navParams.get('item');
    this.userInfo = this.heyApp.authService.userInfo;
  }


  //
  //
  ngOnDestroy() {
    if (this.isUpdated) {
      let params = {};
      params[this.isUpdated] = this.userInfo[this.isUpdated];

      this.userService.update(params)
      .then((response) => {
        this.heyApp.authService.reset(response);
      });
    }
  }


  //
  // show action sheet
  showActionSheet() {
    /*
    let btns = [{
      text: 'Update Avatar',
      handler: () => {
        this.selectAvatar();
      },
    }];
    */
    // this.common.openActionSheet(null, btns);
  }


  //
  //
  selectAvatar() {
    this.inputAvatarEl.nativeElement.click();
  }


  //
  //
  uploadAvatar(event) {
    this.heyApp.utilityComp.presentLoading();
    let files = event.srcElement.files;

    this.heyApp.fileUploadService.upload(this.userService.userUpdateAvatarAPI, files).then(data => {
      this.heyApp.authService.reset(data);
      this.userInfo = data;
      this.heyApp.utilityComp.dismissLoading();
      this.heyApp.utilityComp.presentToast(this.heyApp.translateService.instant('user.Update Avatar Success'));
    }, () => {
      this.heyApp.utilityComp.dismissLoading();
      this.heyApp.utilityComp.presentToast(this.heyApp.translateService.instant('user.Update Avatar Failed'));
    });
  }
}
