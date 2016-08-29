import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController, Loading, LoadingController, AlertController} from 'ionic-angular';


@Injectable()
export class Common {
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
  openLoadingModal() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    return this.loading.present();
  }


  //
  //
  dismissLoadingModal() {
    return this.loading.dismiss();
  }


  //
  //
  openAlter(params?) {
    if (!params) {
      params = {
        title: 'Alter',
        subTitle: '',
      }
    }

    let alert = this.alertCtrl.create({
      title: params.title,
      subTitle: params.subTitle,
      buttons: ['OK']
    });
    return alert.present();
  }


  //
  //
  openConfirm(params?) {
    if (!params) {
      params = {
        title: 'Confirm',
        message: '',
      }
    }

    let confirm = this.alertCtrl.create({
      title: params.title,
      message: params.message,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    return confirm.present();
  }
}

