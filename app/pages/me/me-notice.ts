import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Notice} from '../../models/notice.model';
import {NoticeType, NoticeTypes} from '../../models/noticeType.model';
import {NoticeService} from '../../services/notice.service';
import {Helper} from '../../other/helper.component';


@Component({
  templateUrl: 'build/pages/me/me-notice.html'
})
export class MeNoticePage {
  constructor(
    private helper: Helper,
    private navCtrl: NavController,
    private noticeService: NoticeService
  ) {
  }


  //
  //
  ngOnInit() {
    this.noticeService.getIndex();
  }


  //
  //
  getImg(imgs) {
    return 'null';
  }


  //
  //
  getNoticeText(notice) {
    let type = NoticeTypes[notice.type_id];
    return type.eventText;
  }
}
