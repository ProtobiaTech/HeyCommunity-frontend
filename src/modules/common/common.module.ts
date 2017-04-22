import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicModule, Events } from 'ionic-angular';
import { TranslateModule, TranslateService, TranslateLoader } from 'ng2-translate';

import { MomentPipe, TimeagoPipe } from './pipes/moment.pipe';
import { Nl2brPipe } from './pipes/nl2br.pipe';

import { AppService } from './services/app.service';
import { Helper } from './services/helper.service';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';
import { SystemService } from './services/system.service';
import { FileUploadService } from './services/fileUpload.service';
import { CommonTranslations } from './i18n/common-translations';

import { UtilityComponent } from './pages/utilityComponent';


@NgModule({
  imports: [
    IonicModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
    }),
  ],
  declarations: [
    MomentPipe,
    TimeagoPipe,
    Nl2brPipe,
    UtilityComponent,
  ],
  entryComponents: [
  ],
  providers: [
    // Storage,
    Helper,
    AppService,
    AuthService,
    MenuService,
    SystemService,
    TranslateService,
    FileUploadService,
    UtilityComponent,
  ],
  exports: [
    IonicModule,
    TranslateModule,
    MomentPipe,
    TimeagoPipe,
    Nl2brPipe,
  ],
})
export class CommonModule {
  constructor(
    public heyApp: AppService,
    public events: Events,
    public utilityComp: UtilityComponent
  ) {
    // subscribe events
    this.subscribeEvents();

    // !!! It's should be in app.component to setLang
    // this.heyApp.setLang();
    this.heyApp.loadTranslations(CommonTranslations);

    // get auth
    this.heyApp.authService.getIsAuth();

    // utilityComp register events
    this.utilityComp.registerEvents();
  }


  //
  // Subscribe events
  subscribeEvents() {
    // subscribe auth logIn
    this.events.subscribe('auth:logIn', (userInfo) => {
      this.heyApp.authService.logIn(userInfo);
    });


    // subscribe auth logOut
    this.events.subscribe('auth:logOut', () => {
      this.heyApp.authService.logOut();
    });
  }
}
