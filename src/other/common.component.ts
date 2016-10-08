import {Component, Injectable} from '@angular/core';
import {Nav, NavController, ModalController, Loading, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {ActionSheetController} from 'ionic-angular';


@Injectable()
export class Common {
  //
  loading: Loading;


  constructor(
    private nav: Nav,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController
  ) {}


  //
  //
  openLoadingModal() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 10000,
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


  //
  //
  openToast(message: string, duration: number = 3000, position: string = 'bottom') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
    });
    toast.present();
  }


  //
  //
  openActionSheet(title = 'Operations', btns: Object[] = []) {
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: btns,
    });
    actionSheet.present();
  }
}

