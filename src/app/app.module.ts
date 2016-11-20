import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { CommonModule } from '../modules/common/common.module';
import { UserModule } from '../modules/user/user.module';
import { TimelineModule } from '../modules/timeline/timeline.module';
import { TopicModule } from '../modules/topic/topic.module';


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
