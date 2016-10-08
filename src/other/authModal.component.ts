import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController, Loading, LoadingController, AlertController} from 'ionic-angular';
import {AuthenticatePage} from '../pages/user/authenticate';


@Injectable()
export class AuthModal {
  //
  loading: Loading;


  constructor(
    private nav: Nav,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}


  //
  //
  openAuthenticateModal() {
    let authenticateModal = this.modalCtrl.create(AuthenticatePage);
    return authenticateModal.present();
  }
}

