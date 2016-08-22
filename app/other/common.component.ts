import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController} from 'ionic-angular';
import {UserLogInPage} from '../pages/user/userLogIn';


@Injectable()
export class Common {
  constructor(
    private nav: Nav,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}


  //
  // open user login modal
  openUserLogInModal() {
    let userLogInModal = this.modalCtrl.create(UserLogInPage);
    userLogInModal.present();
  }


  //
  //
}

