import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-hc-debug',
  templateUrl: 'hc-debug.html'
})
export class HCDebugPage {


  //
  // constructor
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  }


  //
  // cancel modal
  cancelModal() {
    this.viewCtrl.dismiss();
  }

}
