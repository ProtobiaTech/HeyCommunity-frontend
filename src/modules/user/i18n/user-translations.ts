import { ZhCn } from './zh-cn';
import { EnGb } from './en-gb';


export class UserTranslations {
  //
  //
  static getTranslations(lang) {
    return UserTranslations.langs[lang] ? UserTranslations.langs[lang] : {};
  }


  //
  //
  static langs = {
    'zh-cn': ZhCn.translations,
    'en-gb': EnGb.translations,
  }
}
