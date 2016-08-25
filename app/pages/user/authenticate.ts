import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, ModalController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {TimelineService} from '../../services/timeline.service';
import {Auth} from '../../other/auth.component';


@Component({
  templateUrl: 'build/pages/user/authenticate.html',
  providers: [
    UserService,
    TimelineService,
  ],
})
export class AuthenticatePage {
  //
  logInModel: {phone?: number, password?: string} = {};

  //
  signUpModel: {nickname?: string, phone?: number, password?: string} = {};

  //
  currentModal: string = 'LogIn';


  //
  //
  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private auth: Auth
  ) {
    if (this.navParams.get('modal')) {
        this.currentModal = this.navParams.get('modal');
    }
  }


  //
  //
  cancelModal() {
    this.viewCtrl.dismiss();
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

