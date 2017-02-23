import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';


@Component({
  selector: 'page-setting-language',
  templateUrl: 'me-setting-language.html'
})
export class MeSettingLanguagePage {
  appLang:  string;
  APP_LANGUAGE: string = 'AppLanguage';


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public navCtrl: NavController
  ) {
    this.appLang = this.heyApp.translateService.currentLang;
  }


  //
  // change app language
  changeAppLang(lang) {
    console.log(lang);
    if (typeof lang === 'string') {
      this.heyApp.setLang(lang);
    }
  }
}
