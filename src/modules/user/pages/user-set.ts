import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../models/user.model';

import { AppService } from '../../common/services/app.service';
import { UserService } from '../services/user.service';

import { FirstPage } from '../../common/pages/first';
import { JiAboutPage } from './ji-about';
import { GetAdvicePage } from './get-advice';


@Component({
  selector: 'user-set',
  templateUrl: 'user-set.html'
})
export class UserSetPage {
  userInfo: User;
  usernameDisabled: boolean = false;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public navCtrl: NavController
  ) {
    this.userInfo = this.heyApp.authService.userInfo;
    this.usernameDisabled = this.userInfo.username.length ? true : false;
  }


  //
  //
  ionViewDidEnter() {
  }


  //
  //
  gotoJiAbout() {
    this.navCtrl.push(JiAboutPage);
  }


  //
  //
  gotoGetAdvice(){
    this.navCtrl.push(GetAdvicePage);
  }


  //
  // goto log out
  gotoLogOut() {
    this.heyApp.utilityComp.presentLoading();

    this.userService.logOut()
    .then(ret => {
      this.heyApp.utilityComp.dismissLoading();
      this.heyApp.authService.logOut();
      this.navCtrl.push(FirstPage);
    });
  }


  //
  //
  setGender(value: number) {
    this.userInfo.gender = value;
  }


  //
  //
  update() {
    this.userService.update(this.userInfo)
    .then(() => {
      this.navCtrl.pop();
    })
  }
}
