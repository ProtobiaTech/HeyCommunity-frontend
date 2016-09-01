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

    let ids = this.getNoticesIds();
    if (ids.length > 0) {
      setTimeout(() => {
        this.check(ids);
      }, 3000);
    }
  }


  //
  //
  destroy(notice) {
    let params = {
      id: notice.id,
    };

    this.noticeService.destroy(params)
    .then((response) => {
      let index = this.noticeService.notices.indexOf(notice);
      this.noticeService.notices.splice(index, 1);
    });
  }


  //
  //
  check(ids) {
    let params = {
      ids: ids,
    }
    this.noticeService.check(params)
    .then();
  }


  //
  //
  destroyAll() {
    let params = {
      id: this.getNoticesIds(),
      is_multiple: true,
    };

    this.noticeService.destroy(params)
    .then((response) => {
      this.noticeService.notices = [];
    });
  }


  //
  //
  getNoticesIds() {
    let ids = [];
    this.noticeService.notices.forEach(function(notice) {
      ids = ids.concat(notice.id);
    }, ids);
    return ids;
  }


  //
  //
  getImg(imgs) {
    if (imgs) {
      return this.helper.getImg(imgs[0].uri);
    } else {
      return '';
    }
  }


  //
  //
  getNoticeText(notice) {
    let type = NoticeTypes[notice.type_id];
    return type.eventText;
  }
}
