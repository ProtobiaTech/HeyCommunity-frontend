import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { Notice } from '../models/notice.model';
import { NoticeTypes } from '../models/noticeType.model';

import { AppService } from '../../common/services/app.service';
import { NoticeService } from '../services/notice.service';


@Component({
  selector: 'page-me-notice',
  templateUrl: 'me-notice.html'
})
export class MeNoticePage {
  notices: Notice[];


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public noticeService: NoticeService,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController
  ) {
    this.notices = [];
  }


  //
  // ionic view did enter
  ionViewDidEnter() {
    /*
    this.noticeService.getIndex();

    let ids = this.getNoticesIds();
    if (ids.length > 0) {
      setTimeout(() => {
        this.check(ids);
      }, 3000);
    }
    */
  }


  //
  // destroy
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
  // check
  check(ids) {
    let params = {
      ids: ids,
    }
    this.noticeService.check(params)
    .then();
  }


  //
  // destroy all
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
  // get notices ids
  getNoticesIds() {
    let ids = [];
    this.noticeService.notices.forEach(function(notice) {
      ids = ids.concat(notice.id);
    }, ids);
    return ids;
  }


  //
  // get notice text
  getNoticeText(notice) {
    let type = NoticeTypes[notice.type_id];
    let text = '';

    if (type.name === 'timeline_like') {
      this.heyApp.translateService.get(type.eventText).subscribe((res: string) => {
        text = res;
      });
    } else {
      text = notice.entity.content;
    }

    return text;
  }


  //
  // show action sheet
  showActionSheet() {
    let buttons = [{
      text: this.heyApp.translateService.instant('notice.Check All'),
      handler: () => {
        this.check(this.getNoticesIds());
      }
    }, {
      text: this.heyApp.translateService.instant('notice.Remove All'),
      role: 'destructive',
      handler: () => {
        this.destroyAll();
      }
    }];

    let actionSheet = this.actionSheetCtrl.create({
      title: this.heyApp.translateService.instant('Operations'),
      buttons: buttons,
    });

    actionSheet.present(actionSheet);
  }
}
