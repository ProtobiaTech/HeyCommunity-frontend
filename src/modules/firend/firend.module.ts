import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { FirendService } from './services/firend.service';

import { FirendPage } from './pages/firend';
import { FirendAddPage } from './pages/firend-add';
import { FirendAddApplyPage } from './pages/firend-add-apply';
import { FirendAddContactPage } from './pages/firend-add-contact';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FirendPage,
    FirendAddPage,
    FirendAddApplyPage,
    FirendAddContactPage,
  ],
  entryComponents: [
    FirendPage,
    FirendAddPage,
    FirendAddApplyPage,
    FirendAddContactPage,
  ],
  providers: [
    FirendService,
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
