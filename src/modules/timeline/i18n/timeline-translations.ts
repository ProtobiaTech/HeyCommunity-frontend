import { ZhCn } from './zh-cn';
import { EnGb } from './en-gb';


export class TimelineTranslations {
  //
  //
  static getTranslations(lang) {
    return TimelineTranslations.langs[lang] ? TimelineTranslations.langs[lang] : {};
  }


  //
  //
  static langs = {
    'zh-cn': ZhCn.translations,
    'en-gb': EnGb.translations,
  }
}
