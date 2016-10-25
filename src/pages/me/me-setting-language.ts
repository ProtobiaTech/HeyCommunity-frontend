import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';


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
    public translateService: TranslateService,
    public navCtrl: NavController
  ) {
    this.appLang = this.translateService.currentLang;
  }


  //
  // change app language
  changeAppLang(lang) {
    this.translateService.use(lang);
    window.localStorage.setItem(this.APP_LANGUAGE, lang);
  }
}
