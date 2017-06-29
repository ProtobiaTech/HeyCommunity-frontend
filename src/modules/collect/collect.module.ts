import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { CollectService } from './services/collect.service';

import { CollectPage } from './pages/collect';
import { CollectMemberPage } from './pages/collect-member';
import { CollectEditPage } from './pages/collect-edit';
import { CollectCreatePage } from './pages/collect-create';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CollectPage,
    CollectMemberPage,
    CollectEditPage,
    CollectCreatePage,
  ],
  entryComponents: [
    CollectPage,
    CollectMemberPage,
    CollectEditPage,
    CollectCreatePage,
  ],
  providers: [
    CollectService,
  ],
  exports: [
  ],
})
export class CollectModule {
  constructor(
    public platform: Platform,
    public events: Events,
    public heyApp: AppService,
  ) {
  }
}
