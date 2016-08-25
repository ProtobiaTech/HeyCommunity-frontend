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


  //
  //
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private auth: Auth,
    private userService: UserService
  ) {
    this.item = this.navParams.get('item');
  }


  //
  //
  goToPage() {
  }
}
