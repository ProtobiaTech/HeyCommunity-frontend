import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AuthenticatePage } from '../../pages/user/authenticate';


@Component({
  selector: 'hc-authenticate-component',
  templateUrl: 'authenticate.html'
})
export class AuthenticateComponent {


  //
  // constructor
  constructor(
    public modalCtrl: ModalController
  ) {
  }


  //
  // present auth modal
  presentAuthModal() {
    let authModal = this.modalCtrl.create(AuthenticatePage);
    authModal.present();
  }
}
