import { Component } from '@angular/core';
import { ModalController, Loading, LoadingController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'hc-utility-component',
  templateUrl: 'utility.html'
})
export class UtilityComponent {
  //
  loading: Loading;


  //
  // constructor
  constructor(
    public translateService: TranslateService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
  }


  //
  // present loading
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: this.translateService.instant('Please Wait ...'),
      duration: 5000,
    });

    return this.loading.present();
  }


  //
  // dismiss loading
  dismissLoading() {
    return this.loading.dismiss();
  }


  //
  // present alter
  presentAlter(params?) {
    if (!params) {
      params = {
        title: this.translateService.instant('Alter'),
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
  // present confirm
  presentConfirm(params?) {
    if (!params) {
      params = {
        title: this.translateService.instant('Confirm'),
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
  // present toast
  presentToast(message: string, duration: number = 3000, position: string = 'top') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      cssClass: 'hc-toast',
      position: position,
    });
    toast.present();
  }


  //
  // present action sheet
  presentActionSheet(title = this.translateService.instant('Operations'), btns: Object[] = []) {
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: btns,
    });
    actionSheet.present();
  }


  //
  // present modal
  presentModal(page, params: Object = {}, callback?) {
    let modal = this.modalCtrl.create(page, params);

    callback && modal.onDidDismiss(callback);

    modal.present();
  }


}
