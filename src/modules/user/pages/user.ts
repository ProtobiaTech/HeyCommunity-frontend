import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../user/models/user.model';

import { AppService } from '../../common/services/app.service';
import { NoticeService } from '../../notice/services/notice.service';
import { CollectService } from '../../collect/services/collect.service';
import { UserService } from '../../user/services/user.service';

import { CollectPage } from '../../collect/pages/collect';
import { SearchPage } from '../../common/pages/search';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  userId: number;
  userInfo: User;

  //
  // constructor
  constructor(
    public heyApp: AppService,
    public noticeService: NoticeService,
    public collectService: CollectService,
    public userService: UserService,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.userId = this.navParams.data.userId;
    this.userService.getUserInfoById(this.userId).then((userInfo) => {
        this.userInfo = userInfo;
    })
  }


  //
  // ion view did enter
  ionViewDidEnter() {
    this.collectService.getUserCollects(this.userId);
  }


  //
  //
  gotoCollectPage(collect) {
    this.navCtrl.push(CollectPage, {collect: collect});
  }


  //
  //
  gotoSearchPage() {
    this.navCtrl.push(SearchPage);
  }
}
