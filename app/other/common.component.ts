import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController, Loading, LoadingController} from 'ionic-angular';
import {AuthenticatePage} from '../pages/user/authenticate';


@Injectable()
export class Common {
  //
  loading: Loading;


  constructor(
    private nav: Nav,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}


  //
  //
  openAuthenticateModal() {
    let authenticateModal = this.modalCtrl.create(AuthenticatePage);
    authenticateModal.present();
  }


  //
  //
  openLoadingModal() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }


  //
  //
  dismissLoadingModal() {
    this.loading.dismiss();
  }
}

