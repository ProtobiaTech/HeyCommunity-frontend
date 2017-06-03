import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';

import { LoginPage } from './pages/login';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoginPage
  ],
  entryComponents: [
    LoginPage
  ],
  providers: [
  ],
  exports: [
  ],
})
export class LoginModule {
  constructor(
    public platform: Platform,
    public events: Events,
    public heyApp: AppService,
  ) {
  }
}
