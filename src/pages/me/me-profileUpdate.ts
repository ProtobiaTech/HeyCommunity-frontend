import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Helper } from '../../other/helper';

import { UserService } from '../../services/user.service';
import { AuthenticateService } from '../../services/authenticate.service';

import { MeAvatarPage} from '../../pages/me/me-avatar';

@Component({
  selector: 'page-me-profileUpdate',
  templateUrl: 'me-profileUpdate.html'
})
export class MeProfileUpdatePage {
  @ViewChild('inputAvatar') inputAvatarEl;

  //
  item: string;
  isUpdated: string = '';
  userInfo: Object = {};


  //
  //
  constructor(
    public helper: Helper,
    public userService: UserService,
    public authService: AuthenticateService,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.item = this.navParams.get('item');
    this.userInfo = this.authService.userInfo;
  }


  //
  //
  ngOnDestroy() {
    if (this.isUpdated) {
      let params = {};
      params[this.isUpdated] = this.userInfo[this.isUpdated];

      this.userService.update(params)
      .then((response) => {
        this.authService.reset(response);
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
    // this.common.openLoadingModal();
    let files = event.srcElement.files;

    /*
    this.fileUploadService.upload(this.userService.userUpdateAvatarAPI, files).then(data => {
      this.auth.reset(data);
      this.userInfo = data;
      this.common.dismissLoadingModal();
      this.common.openToast('Update Avatar success');
    }, () => {
      this.common.dismissLoadingModal();
      this.common.openToast('Update Avatar failed');
    });
    */
  }
}
