import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Helper } from '../../other/helper';
import { UtilityComponent } from '../../pages/component/utility';

import { UserService } from '../../services/user.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { FileUploadService } from '../../services/fileUpload.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'page-me-profileUpdate',
  templateUrl: 'me-profileUpdate.html',
  providers: [
    FileUploadService,
  ],
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
    public helper: Helper,
    public utilityComp: UtilityComponent,
    public userService: UserService,
    public authService: AuthenticateService,
    public fileUploadService: FileUploadService,
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
    this.utilityComp.presentLoading();
    let files = event.srcElement.files;

    this.fileUploadService.upload(this.userService.userUpdateAvatarAPI, files).then(data => {
      this.authService.reset(data);
      this.userInfo = data;
      this.utilityComp.dismissLoading();
      this.utilityComp.presentToast('Update Avatar success');
    }, () => {
      this.utilityComp.dismissLoading();
      this.utilityComp.presentToast('Update Avatar failed');
    });
  }
}
