import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';

import { Helper } from './helper.service';
import { AuthService } from './auth.service';
import { MenuService } from './menu.service';
import { FileUploadService } from './fileUpload.service';
import { UtilityComponent } from '../pages/utilityComponent';

import moment from 'moment';
import 'moment/src/locale/zh-cn';
import 'moment/src/locale/en-gb';


@Injectable()
export class AppService {
  //
  APP_LANGUAGE: string = 'AppLanguage';


  //
  // constructor
  constructor(
    public events: Events,
    public helper: Helper,
    public authService: AuthService,
    public menuService: MenuService,
    public translateService: TranslateService,
    public fileUploadService: FileUploadService,
    public utilityComp: UtilityComponent
  ) {
  }


  //
  // Set lang
  setLang(lang?) {
    if (!lang) {
      lang = this.getDefaultLang();
    }

    // disabled TranslateStaticLoader
    // this.translateService.getTranslation('en-gb');
    // this.translateService.getTranslation('zh-cn');

    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    moment.locale(lang);
    window.localStorage.setItem(this.APP_LANGUAGE, lang);
  }


  //
  // get default lang
  getDefaultLang() {
    let lang: string;
    if (window.localStorage.hasOwnProperty(this.APP_LANGUAGE)) {
      lang = window.localStorage.getItem(this.APP_LANGUAGE);
    } else {
      lang = window.navigator.language;
      lang = /^(zh-cn)$/gi.test(lang) ? 'zh-cn' : 'en-gb';
    }

    return lang;
  }


  //
  // load translations
  loadTranslations(trans) {
    for (let lang in trans.langs) {
      let translations = trans.getTranslations(lang);
      this.translateService.setTranslation(lang, translations, true);

      console.log(this.translateService);
    }
  }
}
