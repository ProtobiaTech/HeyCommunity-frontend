import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Helper} from '../../other/helper.component';
import {Auth} from '../../other/auth.component';
import {UserService} from '../../services/user.service';


@Component({
  templateUrl: 'build/pages/me/me-updateProfile.html'
})
export class MeUpdateProfilePage {
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
}
