import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { UtilityComponent } from '../../pages/component/utility';

import { UserService} from '../../services/user.service';
import { AuthenticateService } from '../../services/authenticate.service';


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
    public translateService: TranslateService,
    public utilityComp: UtilityComponent,
    public viewCtrl: ViewController,
    public userService: UserService,
    public auth: AuthenticateService
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
      this.utilityComp.presentLoading();

      this.userService.logIn(data)
      .then(ret => {
        this.utilityComp.dismissLoading();

        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then((data) => {
          this.utilityComp.presentToast(ret.nickname + ', ' + this.translateService.instant('Welcome back'),);
        });
      }, (data) => {
        this.utilityComp.dismissLoading();
        this.utilityComp.presentAlter({title: this.translateService.instant('Log In Failed'), subTitle: data._body});
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
      this.utilityComp.presentLoading();

      this.userService.signUp(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then(() => {
          this.utilityComp.dismissLoading();
          this.utilityComp.presentToast(this.translateService.instant('Sign Up Success, Welcome ') + ret.nickname);
        });
      }, (data) => {
        this.utilityComp.dismissLoading().then(() => {
          let body = JSON.parse(data._body);
          this.utilityComp.presentAlter({title: this.translateService.instant('Sign Up Failed'), subTitle: body[Object.keys(body)[0]]});
        });
      });
    }
  }
}
