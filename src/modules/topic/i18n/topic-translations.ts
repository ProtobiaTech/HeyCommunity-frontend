import { ZhCn } from './zh-cn';
import { EnGb } from './en-gb';


export class TopicTranslations {
  //
  //
  static getTranslations(lang) {
    return TopicTranslations.langs[lang] ? TopicTranslations.langs[lang] : {};
  }


  //
  //
  static langs = {
    'zh-cn': ZhCn.translations,
    'en-gb': EnGb.translations,
  }
}
