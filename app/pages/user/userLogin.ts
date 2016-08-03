import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/user/user-logIn.html'
})
export class UserLogInPage {
  //
  //
  constructor(
    private navController: NavController,
    private viewCtrl: ViewController
  ) {
  }


  //
  //
  cancelModal() {
    this.viewCtrl.dismiss();
    console.log(this.viewCtrl);
  }
}
