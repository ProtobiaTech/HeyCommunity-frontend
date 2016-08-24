import {Component} from '@angular/core';
import {NavController, ViewController, ModalController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {Auth} from '../../other/auth.component';

import {UserLogInPage} from '../../pages/user/userLogIn';

@Component({
  templateUrl: 'build/pages/user/user-signUp.html',
  providers: [
    UserService,
  ],
})
export class UserSignUpPage {
  //
  signUpModel: {nickname?: string, phone?: number, password?: string} = {};


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
    console.log('dismiss sign up modal');
  }


  //
  //
  openUserLogInModal() {
    this.cancelModal();
    console.log('open log in modal');
    let userLogInModal = this.modalCtrl.create(UserLogInPage);
    userLogInModal.present();
  }


  //
  //
  signUpHandler(ngForm) {
    let data: Object = {
      nickname: this.signUpModel.nickname,
      phone: this.signUpModel.phone,
      password: this.signUpModel.password,
    };

    if (ngForm.valid) {
      this.userService.signUp(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss();
      });
    }
  }
}
