import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController} from 'ionic-angular';
import {UserLogInPage} from '../pages/user/userLogIn';
import {UserSignUpPage} from '../pages/user/userSignUp';


@Injectable()
export class Common {
  constructor(
    private nav: Nav,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}


  //
  // open user log in modal
  openUserLogInModal() {
    console.log('open log in modal');
    let userLogInModal = this.modalCtrl.create(UserLogInPage);
    userLogInModal.present();
  }


  //
  // open user sign up
  openUserSignUpModal() {
    console.log('open sign up modal');
    let userSignUpModal = this.modalCtrl.create(UserSignUpPage);
    userSignUpModal.present();
  }
}

