import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { Badge } from '@ionic-native/badge';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Transfer } from '@ionic-native/transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonModule } from '../modules/common/common.module';
import { UserModule } from '../modules/user/user.module';
import { NoticeModule } from '../modules/notice/notice.module';
import { TimelineModule } from '../modules/timeline/timeline.module';
import { TopicModule } from '../modules/topic/topic.module';
import { FirendModule } from '../modules/firend/firend.module';

import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabbarPlacement: 'bottom',
      backButtonIcon: 'arrow-round-back',
      backButtonColor: 'dark',
    }),
    IonicStorageModule.forRoot(),
    CommonModule,
    UserModule,
    NoticeModule,
    TimelineModule,
    TopicModule,
    FirendModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Badge,
    Transfer,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
