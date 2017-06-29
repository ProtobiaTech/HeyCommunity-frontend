import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { CollectService } from '../services/collect.service';


@Component({
  selector: 'page-collect-create',
  templateUrl: 'collect-create.html'
})
export class CollectCreatePage {
  newCollect: {name?: string, description?: string, type_id?: number} = {};

  //
  // constructor
  constructor(
    public heyApp: AppService,
    public collectService: CollectService,
    public navCtrl: NavController
  ) {
  }


  //
  //
  createHandle() {
    this.collectService.store(this.newCollect)
    .then(() => {
      this.navCtrl.pop();
    });
  }
}
