import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { UserService } from '../../user/services/user.service';
import { TabsPage } from '../../../pages/tabs/tabs';


@Component({
  selector: 'first',
  templateUrl: 'first.html'
})
export class FirstPage {
  //
  ifFirst: boolean = true;

  //
  ifLogin: boolean = false;

  //
  ifRegister: boolean = false;

  //
  ifLoginByCode:boolean = false;

  //
  ifRegisterEnd:boolean = false;


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
  loginByCode() {
    this.ifLoginByCode = true;
  }


  //
  //
  loginByPsd() {
      this.ifLoginByCode = false;
  }


  //
  //
  goRegisterend() {
    this.ifRegisterEnd = true;
    this.ifLogin = false;
    this.ifFirst = false;
    this.ifRegister = false;
  }


  //
  //
  registerEnd() {
      console.log('注册完成！');
      this.navCtrl.push(TabsPage);
  }


  //
  //
  goTabPage() {
      this.userService.logInByTest().then((userInfo) => {
        this.heyApp.authService.logIn(userInfo);
        this.navCtrl.push(TabsPage);
      });
  }


  //
  //
  goLogin() {
      this.ifLogin = true;
      this.ifFirst = false;
      this.ifRegister = false;
  }


  //
  //
  goRegister() {
      this.ifLogin = false;
      this.ifFirst = false;
      this.ifRegister = true;
  }
}
