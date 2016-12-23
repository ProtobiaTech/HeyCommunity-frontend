import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CommonModule } from '../modules/common/common.module';
import { UserModule } from '../modules/user/user.module';
import { TimelineModule } from '../modules/timeline/timeline.module';
import { TopicModule } from '../modules/topic/topic.module';

import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabbarPlacement: 'bottom',
      backButtonIcon: 'arrow-round-back',
      backButtonColor: 'dark',
    }, {
    }),
    CommonModule,
    UserModule,
    TimelineModule,
    TopicModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
