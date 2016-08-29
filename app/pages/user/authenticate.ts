import {Component} from '@angular/core';
import {Nav, NavController, ViewController, NavParams, ModalController, Loading, LoadingController, AlertController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {TimelineService} from '../../services/timeline.service';
import {Auth} from '../../other/auth.component';
import {Common} from '../../other/common.component';


@Component({
  templateUrl: 'build/pages/user/authenticate.html',
  providers: [
    UserService,
    TimelineService,
    Nav,
    Common,
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
  loading: Loading;


  //
  //
  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private common: Common,
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
      this.common.openLoadingModal();

      this.userService.logIn(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then((data) => {
          this.common.dismissLoadingModal();
          this.common.openToast('Welcome back');
        });
      }, (data) => {
        this.common.dismissLoadingModal().then(() => {
          this.common.openAlter({title: 'LogIn Failed', subTitle: data._body});
        });
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
      this.common.openLoadingModal();

      this.userService.signUp(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then(() => {
          this.common.dismissLoadingModal();
          this.common.openToast('Sign up success, Welcome ' + ret.nickname);
        });
      }, (data) => {
        this.common.dismissLoadingModal().then(() => {
          let body = JSON.parse(data._body);
          this.common.openAlter({title: 'SignUp Failed', subTitle: body[Object.keys(body)[0]]});
        });
      });
    }
  }
}
