import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Collect } from '../models/collect.model';

import { AppService } from '../../common/services/app.service';


@Component({
  selector: 'page-collect-member',
  templateUrl: 'collect-member.html'
})
export class CollectMemberPage {
  collect: Collect;

  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.collect = this.navParams.data.collect;
  }
}
