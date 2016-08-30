import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Helper} from '../../other/helper.component';
import {Auth} from '../../other/auth.component';
import {UserService} from '../../services/user.service';

import {MeUpdateProfilePage} from '../../pages/me/me-updateProfile';


@Component({
  templateUrl: 'build/pages/me/me-profile.html'
})
export class MeProfilePage {
  meUpdateProfilePage = MeUpdateProfilePage;


  //
  //
  constructor(
    private navCtrl: NavController,
    private auth: Auth,
    private helper: Helper,
    private userService: UserService
  ) {
  }
}
