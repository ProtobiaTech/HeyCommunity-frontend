import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController} from 'ionic-angular';
import {AuthenticatePage} from '../pages/user/authenticate';


@Injectable()
export class Common {
  constructor(
    private nav: Nav,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}


  //
  //
  openAuthenticateModal() {
    let authenticateModal = this.modalCtrl.create(AuthenticatePage);
    authenticateModal.present();
  }
}

