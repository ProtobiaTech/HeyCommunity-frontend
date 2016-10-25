import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
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
    public events: Events,
    public translateService: TranslateService,
    public navCtrl: NavController
  ) {
    this.appLang = this.translateService.currentLang;
  }


  //
  // change app language
  changeAppLang(lang) {
    console.log(lang);
    if (typeof lang === 'string') {
      this.events.publish('app:changeLang', lang);
      this.translateService.use(lang);
      window.localStorage.setItem(this.APP_LANGUAGE, lang);
    }
  }
}
