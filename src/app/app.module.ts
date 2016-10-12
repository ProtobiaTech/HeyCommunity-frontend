import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

import { AuthenticateService } from '../services/authenticate.service';
import { TimelineService } from '../services/timeline.service';
import { UserService } from '../services/user.service';
import { NoticeService } from '../services/notice.service';

import { Helper } from '../other/helper';
import { AuthenticateComponent } from '../pages/component/authenticate';
import { UtilityComponent } from '../pages/component/utility';
import { MomentPipe, TimeagoPipe } from '../other/moment.pipe';

import { AuthenticatePage } from '../pages/user/authenticate';

import { TimelinePage } from '../pages/timeline/timeline';
import { TimelineDetailPage } from '../pages/timeline/timeline-detail';
import { TimelineCreatePage } from '../pages/timeline/timeline-create';
import { TimelineCommentPage } from '../pages/timeline/timeline-comment';

import { MePage } from '../pages/me/me';
import { MeProfilePage } from '../pages/me/me-profile';
import { MeProfileUpdatePage } from '../pages/me/me-profileUpdate';
import { MeAvatarPage } from '../pages/me/me-avatar';
import { MeNoticePage } from '../pages/me/me-notice';
import { MeTimelinePage } from '../pages/me/me-timeline';
import { MeSettingPage } from '../pages/me/me-setting';
import { MeHeyCommunityPage } from '../pages/me/me-heycommunity';
import { MeSettingLanguagePage } from '../pages/me/me-setting-language';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';


@NgModule({
  declarations: [
    MyApp,
    MomentPipe,
    TimeagoPipe,
    AuthenticateComponent,
    UtilityComponent,
    AuthenticatePage,
    TimelinePage,
    TimelineDetailPage,
    TimelineCreatePage,
    TimelineCommentPage,
    MePage,
    MeProfilePage,
    MeProfileUpdatePage,
    MeAvatarPage,
    MeNoticePage,
    MeTimelinePage,
    MeSettingPage,
    MeHeyCommunityPage,
    MeSettingLanguagePage,
    TabsPage,
    TutorialPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabbarPlacement: 'bottom',
      backButtonIcon: 'arrow-round-back',
      backButtonColor: 'dark',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthenticatePage,
    TimelinePage,
    TimelineDetailPage,
    TimelineCreatePage,
    TimelineCommentPage,
    MePage,
    MeProfilePage,
    MeProfileUpdatePage,
    MeAvatarPage,
    MeNoticePage,
    MeTimelinePage,
    MeSettingPage,
    MeHeyCommunityPage,
    MeSettingLanguagePage,
    TabsPage,
    TutorialPage,
  ],
  providers: [
    Storage,
    AuthenticateService,
    TimelineService,
    UserService,
    NoticeService,
    Helper,
    AuthenticateComponent,
    UtilityComponent,
  ],
})
export class AppModule {}
