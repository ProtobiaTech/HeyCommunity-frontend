import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { UserService} from '../services/user.service';


@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html'
})
export class AuthenticatePage {
  //
  logInModel: {phone?: number, password?: string} = {};

  //
  signUpModel: {nickname?: string, phone?: number, password?: string} = {};

  //
  currentModal: string = 'LogIn';


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public viewCtrl: ViewController,
  ) {
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
      this.heyApp.utilityComp.presentLoading();

      this.userService.logIn(data)
      .then(ret => {
        this.heyApp.utilityComp.dismissLoading();

        this.heyApp.authService.logIn(ret);
        this.viewCtrl.dismiss().then((data) => {
          this.heyApp.utilityComp.presentToast(ret.nickname + ', ' + this.heyApp.translateService.instant('user.Welcome back'),);
        });
      }, (data) => {
        this.heyApp.utilityComp.dismissLoading();
        this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Log In Failed'), subTitle: data._body});
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
      this.heyApp.utilityComp.presentLoading();

      this.userService.signUp(data)
      .then(ret => {
        this.heyApp.authService.logIn(ret);
        this.viewCtrl.dismiss().then(() => {
          this.heyApp.utilityComp.dismissLoading();
          this.heyApp.utilityComp.presentToast(this.heyApp.translateService.instant('user.Sign Up Success, Welcome ') + ret.nickname);
        });
      }, (data) => {
        this.heyApp.utilityComp.dismissLoading().then(() => {
          let body = JSON.parse(data._body);
          this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Sign Up Failed'), subTitle: body[Object.keys(body)[0]]});
        });
      });
    }
  }


  //
  //
  gotoWeChatOAuthPage() {
    location.assign('/api/wechat/o-auth');
  }
}
