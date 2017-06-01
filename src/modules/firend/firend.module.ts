import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';

import { FirendPage } from './pages/firend';



@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FirendPage,
  ],
  entryComponents: [
    FirendPage,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class FirendModule {
  constructor(
    public platform: Platform,
    public events: Events,
    public heyApp: AppService,
  ) {
  }
}
