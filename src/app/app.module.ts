import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { TimelinePage } from '../pages/timeline/timeline';
import { TimelineDetailPage } from '../pages/timeline/timeline-detail';
import { TimelineCreatePage } from '../pages/timeline/timeline-create';
import { TimelineCommentPage } from '../pages/timeline/timeline-comment';

import { TopicPage } from '../pages/topic/topic';
import { ActivityPage } from '../pages/activity/activity';

import { MePage } from '../pages/me/me';
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
    TimelinePage,
    TimelineDetailPage,
    TimelineCreatePage,
    TimelineCommentPage,
    TopicPage,
    ActivityPage,
    MePage,
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
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimelinePage,
    TimelineDetailPage,
    TimelineCreatePage,
    TimelineCommentPage,
    TopicPage,
    ActivityPage,
    MePage,
    MeNoticePage,
    MeTimelinePage,
    MeSettingPage,
    MeHeyCommunityPage,
    MeSettingLanguagePage,
    TabsPage,
    TutorialPage,
  ],
  providers: []
})
export class AppModule {}
