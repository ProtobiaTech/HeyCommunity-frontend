import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular';

import { UserService} from '../../services/user.service';
import { AuthenticateService } from '../../services/authenticate.service';


@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',
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
  // constructor
  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: AuthenticateService
  ) {
    if (this.navParams.get('modal')) {
      this.currentModal = this.navParams.get('modal');
    }
  }


  //
  // cancel modal
  cancelModal() {
    this.viewCtrl.dismiss();
  }


  //
  // login handler
  logInHandler(ngForm) {
    let data: Object = {
      phone: this.logInModel.phone,
      password: this.logInModel.password,
    };

    if (ngForm.valid) {

      this.userService.logIn(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then((data) => {
        });
      }, (data) => {
      });
    }
  }


  //
  // sign up handler
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
        this.viewCtrl.dismiss().then(() => {
        });
      }, (data) => {
      });
    }
  }
}
