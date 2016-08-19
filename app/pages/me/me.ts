import {Component, ViewChild} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';

import {Auth} from '../../other/auth.component';

import {MeProfilePage} from '../me/me-profile';
import {UserSignUpPage} from '../user/userSignUp';
import {UserLogInPage} from '../user/userLogIn';

@Component({
  templateUrl: 'build/pages/me/me.html'
})
export class MePage {
  isAuth: any;

  constructor(
    private navCtrl: NavController,
    private auth: Auth
  ) {
    this.isAuth = false;
  }


  //
  //
  goToPage() {
    let modal = Modal.create(UserLogInPage);
    this.navCtrl.present(modal);
  }


  //
  // go to me profile page
  goToMeProfilePage() {
    this.navCtrl.rootNav.push(MeProfilePage);
  }
}
