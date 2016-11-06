import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TranslateModule, TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

import { AuthenticateService } from '../services/authenticate.service';
import { TimelineService } from '../services/timeline.service';
import { UserService } from '../services/user.service';
import { SystemService } from '../services/system.service';
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
import { MeNoticePage } from '../pages/me/me-notice';
import { MeTimelinePage } from '../pages/me/me-timeline';
import { MeSettingPage } from '../pages/me/me-setting';
import { MeHeyCommunityPage } from '../pages/me/me-heycommunity';
import { MeDebugPage } from '../pages/me/me-debug';
import { MeSettingLanguagePage } from '../pages/me/me-setting-language';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


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
    MeNoticePage,
    MeTimelinePage,
    MeSettingPage,
    MeHeyCommunityPage,
    MeDebugPage,
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
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
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
    MeNoticePage,
    MeTimelinePage,
    MeSettingPage,
    MeHeyCommunityPage,
    MeDebugPage,
    MeSettingLanguagePage,
    TabsPage,
    TutorialPage,
  ],
  providers: [
    TranslateService,
    Storage,
    SystemService,
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
