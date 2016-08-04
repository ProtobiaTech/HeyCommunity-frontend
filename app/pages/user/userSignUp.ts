import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {Auth} from '../../other/Auth.component';

@Component({
  templateUrl: 'build/pages/user/user-signUp.html',
  providers: [
    UserService,
  ],
})
export class UserSignUpPage {
  signUpModel: {nickname?: string, phone?: number, password?: string} = {};


  //
  //
  constructor(
    private navController: NavController,
    private viewCtrl: ViewController,
    private userService: UserService,
    private auth: Auth
  ) {
  }


  //
  //
  cancelModal() {
    this.viewCtrl.dismiss();
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
