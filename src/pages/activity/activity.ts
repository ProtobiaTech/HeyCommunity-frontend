import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
  activities: Object[];

  constructor(public navCtrl: NavController) {
      this.activities = [
        {
          pic: './assets/images/activity/1.png',
        },
        {
          pic: './assets/images/activity/2.png',
        },
        {
          pic: './assets/images/activity/3.png',
        },
        {
          pic: './assets/images/activity/4.png',
        },
      ];
  }

}
