import { Component } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';


@Component({
  selector: 'hc-utility-component',
  templateUrl: 'utility.html'
})
export class UtilityComponent {


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
}
