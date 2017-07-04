import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { CollectService } from '../../collect/services/collect.service';

import { CollectPage } from '../../collect/pages/collect';
import { CollectCreatePage } from '../../collect/pages/collect-create';
import { SearchPage } from '../../common/pages/search';

import { UserSetPage } from './user-set';


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  collectType: number = 1;

  //
  // constructor
  constructor(
    public heyApp: AppService,
    public collectService: CollectService,
    public navCtrl: NavController
  ) {
  }


  //
  // ion view did enter
  ionViewDidLoad() {
    this.collectService.getMyCollects();
    this.collectService.getMyFollowCollects();
  }


  //
  // Refresh
  doRefresh(refresher) {
    this.collectService.getMyCollects();
    this.collectService.getMyFollowCollects();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


  //
  //
  goUserSet() {
    this.navCtrl.push(UserSetPage)
  }


  //
  //
  gotoCollectPage(collect) {
    this.navCtrl.push(CollectPage, {collect: collect});
  }


  //
  //
  gotoCollectCreatePage() {
    this.navCtrl.push(CollectCreatePage);
  }


  //
  //
  gotoSearchPage() {
    this.navCtrl.push(SearchPage);
  }
}
