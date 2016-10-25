import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilityComponent } from '../../pages/component/utility';

import { MeDebugPage } from '../../pages/me/me-debug';


@Component({
  selector: 'page-me-heycommunity',
  templateUrl: 'me-heycommunity.html'
})
export class MeHeyCommunityPage {


  //
  // constructor
  constructor(
    public utilityComp: UtilityComponent,
    public navCtrl: NavController
  ) {
  }


  //
  // present medebug modal
  presentMeDebugModal() {
    let page = MeDebugPage;
    let params = {}
    let callback = function() {}
    this.utilityComp.presentModal(page, params, callback);
  }
}
