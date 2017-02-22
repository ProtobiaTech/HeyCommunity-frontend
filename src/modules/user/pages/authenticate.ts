import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

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
  WeChatPlugin: any;

  //
  hasWeChatApp: boolean = false;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public viewCtrl: ViewController,
  ) {
    this.WeChatPlugin = (<any> window).Wechat;
    this.WeChatPlugin.isInstalled(() => {
      this.hasWeChatApp = true;
    })
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

        this.heyApp.authService.logIn(ret);
        this.viewCtrl.dismiss().then(() => {
          this.heyApp.utilityComp.dismissLoading();
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
  // goto wechat oauth page
  gotoWeChatOAuthPage() {
    location.assign('/api/wechat/o-auth');
  }


  //
  // login with wechat app
  loginWithWeChatApp() {
    this.heyApp.utilityComp.presentLoading();

    let scope = "snsapi_userinfo";
    let state = "_" + (+new Date());

    this.WeChatPlugin.auth(scope, state, (response) => {

        this.userService.logInWithWechat(response).then((ret) => {
          this.heyApp.authService.logIn(ret);

          this.viewCtrl.dismiss().then(() => {
            this.heyApp.utilityComp.dismissLoading();
            this.heyApp.utilityComp.presentToast(ret.nickname + ', ' + this.heyApp.translateService.instant('user.Welcome back'),);
          });
        }, (data) => {
          this.viewCtrl.dismiss().then(() => {
            this.heyApp.utilityComp.dismissLoading();
            this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Log In Failed'), subTitle: data._body});
          });
        });
    }, function (reason) {
        this.viewCtrl.dismiss().then(() => {
          this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Log In Failed'), subTitle: reason});
        });
    });
  }

  //
  // open terms page
  openTermsPage() {
    let url = (<any> window).API_DOMAIN + '/docs/terms.txt';
    if (this.heyApp.platform.is('cordova')) {
      let browser = new InAppBrowser(url, '_system');
      browser.show();
    } else {
      (<any> window).open(url, '_blank');
    }
  }
}
