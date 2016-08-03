import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/user/user-signIn.html'
})
export class UserSignInPage {
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
