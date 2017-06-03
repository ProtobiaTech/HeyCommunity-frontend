import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';

import { JiAboutPage } from './ji-about';
import { GetAdvicePage } from './get-advice';


@Component({
  selector: 'user-set',
  templateUrl: 'user-set.html'
})
export class UserSetPage {


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
  }


  //
  //
  gotoJiAbout() {
    this.navCtrl.push(JiAboutPage);
  }


  //
  //
  gotoGetAdvice(){
    this.navCtrl.push(GetAdvicePage);
  }
}
  