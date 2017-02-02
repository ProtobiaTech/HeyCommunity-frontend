import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { UserService } from '../services/user.service';
import { TimelineService } from '../../timeline/services/timeline.service';
import { TopicService } from '../../topic/services/topic.service';

import { HCAboutPage } from './hc-about';
import { HCGuidePage } from './hc-guide';
import { HCFeedbackPage } from './hc-feedback';
import { MeSettingLanguagePage } from './me-setting-language';
// import { MeSettingClearCachePage } from './me-setting-clearCache';


@Component({
  selector: 'page-setting',
  templateUrl: 'me-setting.html'
})
export class MeSettingPage {
  HCAboutPage = HCAboutPage;
  HCGuidePage = HCGuidePage;
  HCFeedbackPage = HCFeedbackPage;
  MeSettingLanguagePage = MeSettingLanguagePage;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public timelineService: TimelineService,
    public topicService: TopicService,
    public navCtrl: NavController,
    public userService: UserService,
  ) {
  }


  //
  // goto log out
  gotoLogOut() {
    this.heyApp.utilityComp.presentLoading();

    this.userService.logOut()
    .then(ret => {
      this.heyApp.utilityComp.dismissLoading();
      this.heyApp.authService.logOut();
      this.navCtrl.pop();
    });
  }


  //
  // clear cache
  clearCacheHandler() {
    this.timelineService.clearCache();
    this.topicService.clearCache();
    this.heyApp.utilityComp.presentToast(this.heyApp.translateService.instant('user.Clear the cache success'));
  }
}
