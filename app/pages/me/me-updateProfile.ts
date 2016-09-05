import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Helper} from '../../other/helper.component';
import {Auth} from '../../other/auth.component';
import {Common} from '../../other/common.component';
import {UserService} from '../../services/user.service';
import {FileUploadService} from '../../services/fileUpload.service';


@Component({
  templateUrl: 'build/pages/me/me-updateProfile.html',
  providers: [
    Common,
    FileUploadService,
  ],
})
export class MeUpdateProfilePage {
  @ViewChild('inputAvatar') inputAvatarEl;

  //
  item: string;
  isUpdated: string = '';
  userInfo: Object = {};


  //
  //
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private auth: Auth,
    private helper: Helper,
    private common: Common,
    private fileUploadService: FileUploadService,
    private userService: UserService
  ) {
    this.item = this.navParams.get('item');
    this.userInfo = this.auth.userInfo;
  }


  //
  //
  ngOnDestroy() {
    if (this.isUpdated) {
      let params = {};
      params[this.isUpdated] = this.userInfo[this.isUpdated];

      this.userService.update(params)
      .then((response) => {
        this.auth.reset(response);
      });
    }
  }


  //
  // show action sheet
  showActionSheet() {
    let btns = [{
      text: 'Update Avatar',
      handler: () => {
        this.selectAvatar();
      },
    }];
    this.common.openActionSheet(null, btns);
  }


  //
  //
  selectAvatar() {
    this.inputAvatarEl.nativeElement.click();
  }


  //
  //
  uploadAvatar(event) {
    this.common.openLoadingModal();
    let files = event.srcElement.files;

    this.fileUploadService.upload(this.userService.userUpdateAvatarAPI, files).then(data => {
      this.auth.reset(data);
      this.userInfo = data;
      this.common.dismissLoadingModal();
      this.common.openToast('Update Avatar success');
    }, () => {
      this.common.dismissLoadingModal();
      this.common.openToast('Update Avatar failed');
    });
  }
}
