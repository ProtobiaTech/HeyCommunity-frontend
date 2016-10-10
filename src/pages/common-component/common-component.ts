import { Component } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';

import { AuthenticatePage } from '../../pages/user/authenticate';


@Component({
  selector: 'hc-common-component',
  templateUrl: 'common-component.html'
})
export class CommonComponent {


  //
  // constructor
  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
  }


  //
  // present loaging
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    // loader.dismiss();
    loader.present();
  }


  //
  // present auth modal
  presentAuthModal() {
    let authModal = this.modalCtrl.create(AuthenticatePage);
    authModal.present();
  }
}
