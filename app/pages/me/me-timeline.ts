import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MomentPipe, TimeagoPipe} from '../../other/moment.pipe';
import {Auth} from '../../other/auth.component';
import {Helper} from '../../other/helper.component';
import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';


@Component({
  templateUrl: 'build/pages/me/me-timeline.html',
  pipes: [
    TimeagoPipe,
    MomentPipe,
  ],
})
export class MeTimelinePage {
  myTimelines: Timeline[] = [];

  //
  //
  constructor(
    private auth: Auth,
    private helper: Helper,
    private navCtrl: NavController,
    private timelineService: TimelineService
  ) {
    if (this.auth.isAuth) {
      this.timelineService.timelines.forEach(function(timeline) {
        if (timeline.user_id === this.auth.userInfo.user_id) {
          this.myTimelines = this.myTimelines.concat(timeline);
        }
      }, this)
    }
  }
}
