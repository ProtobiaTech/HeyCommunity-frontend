import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { CommonModule } from '../modules/common/common.module';
import { UserModule } from '../modules/user/user.module';
import { TimelineModule } from '../modules/timeline/timeline.module';
import { TopicModule } from '../modules/topic/topic.module';

import { TimelinePage } from '../modules/timeline/pages/timeline';
import { TimelineDetailPage } from '../modules/timeline/pages/timeline-detail';

import { TopicPage } from '../modules/topic/pages/topic';
import { TopicDetailPage } from '../modules/topic/pages/topic-detail';

import { MePage } from '../modules/user/pages/me';

@NgModule({
  declarations: [
    MyApp,
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
    }, {
      links: [
        { component: TimelinePage, name: 'park', segment: 'r/park' },
        { component: TimelineDetailPage, name: 'TimelineDetail', segment: 'r/park/detail/:timeline/:timelineIndex' },
        { component: TopicPage, name: 'topic', segment: 'r/topic' },
        { component: TopicDetailPage, name: 'TopicDetail', segment: 'r/topic/detail/:topic/:topicIndex' },
        { component: MePage, name: 'me', segment: 'r/me' },
      ],
    }),
    CommonModule,
    UserModule,
    TimelineModule,
    TopicModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TutorialPage,
  ],
  providers: [
  ],
})
export class AppModule {}
