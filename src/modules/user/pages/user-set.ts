import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { UserService } from '../services/user.service';

import { JiAboutPage } from './ji-about';
import { GetAdvicePage } from './get-advice';


@Component({
  selector: 'user-set',
  templateUrl: 'user-set.html'
})
export class UserSetPage {


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public userService: UserService,
    public navCtrl: NavController
  ) {
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
      this.navCtrl.pop();
    });
  }
}
