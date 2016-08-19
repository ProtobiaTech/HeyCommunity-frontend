import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {UserLogInPage} from '../pages/user/userLogIn';

export class Common {
  constructor(
    private firstParam?: any,
    private secondParam?: any,
    private thirdParam?: any,
    private fourthParam?: any
  ) {}


  //
  // open user login modal
  openUserLogInModal() {
    let userLogInModal = Modal.create(UserLogInPage);
    this.firstParam.present(userLogInModal);
  }


  //
  //
}

