import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {Auth} from '../../other/Auth.component';


@Component({
  templateUrl: 'build/pages/user/user-logIn.html',
  providers: [
    UserService,
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
    private userService: UserService,
    private auth: Auth
  ) {
  }


  //
  //
  cancelModal() {
    this.viewCtrl.dismiss();
    console.log(this.viewCtrl);
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
