import { ZhCn } from './zh-cn';
import { EnGb } from './en-gb';


export class NoticeTranslations {
  //
  //
  static getTranslations(lang) {
    return NoticeTranslations.langs[lang] ? NoticeTranslations.langs[lang] : {};
  }


  //
  //
  static langs = {
    'zh-cn': ZhCn.translations,
    'en-gb': EnGb.translations,
  }
}
