import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
// import { LoginPage } from './login';
import { TabsPage } from '../../../pages/tabs/tabs';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }

  ifFirst = true;
  ifLogin = false;
  ifRegister = false; 
  LoginByCode = false;
  ifRegisterEnd = false;

  //
  //
  loginByCode() {
    this.LoginByCode = true;
  }

  loginByPsd() {
      this.LoginByCode = false;
  }

  goRegisterend() {
    this.ifRegisterEnd = true;
    this.ifLogin = false;
    this.ifFirst = false;
    this.ifRegister = false;
  }

  registerEnd() {
      console.log('注册完成！');
      this.navCtrl.push(TabsPage);
  }

  goTabPage() {
      this.navCtrl.push(TabsPage);
  }

  goLogin() {
      this.ifLogin = true;
      this.ifFirst = false;
      this.ifRegister = false;
  }

  goRegister() {
      this.ifLogin = false;
      this.ifFirst = false;
      this.ifRegister = true;
  }
}
