import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';

import { FirendPage } from './pages/firend';
import { FirendAddPage } from './pages/firend-add';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FirendPage,
    FirendAddPage,
  ],
  entryComponents: [
    FirendPage,
    FirendAddPage,
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
