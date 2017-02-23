import { ZhCn } from './zh-cn';
import { EnGb } from './en-gb';


export class CommonTranslations {
  //
  //
  static getTranslations(lang) {
    return CommonTranslations.langs[lang] ? CommonTranslations.langs[lang] : {};
  }


  //
  //
  static langs = {
    'zh-cn': ZhCn.translations,
    'en-gb': EnGb.translations,
  }
}
