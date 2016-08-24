import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {TimelineService} from '../../services/timeline.service';
import {Auth} from '../../other/auth.component';

import {UserSignUpPage} from '../../pages/user/userSignUp';

@Component({
  templateUrl: 'build/pages/user/user-logIn.html',
  providers: [
    UserService,
    TimelineService,
  ],
})
export class UserLogInPage {
  //
  logInModel: {phone?: number, password?: string} = {};


  //
  //
  constructor(
    private navController: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private auth: Auth
  ) {
  }


  //
  //
  cancelModal() {
    this.viewCtrl.dismiss();
    console.log('dismiss log in modal');
  }


  //
  //
  openUserSignUpModal() {
    this.cancelModal();
    let userSignUpModal = this.modalCtrl.create(UserSignUpPage);
    userSignUpModal.present();
  }


  //
  //
  logInHandler(ngForm) {
    let data: Object = {
      phone: this.logInModel.phone,
      password: this.logInModel.password,
    };

    if (ngForm.valid) {
      this.userService.logIn(data)
      .then(ret => {
        this.auth.logIn(ret);
        console.log('ret', ret);
        this.viewCtrl.dismiss();
      });
    }
  }
}
