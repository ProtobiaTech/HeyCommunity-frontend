import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Notice } from '../models/notice.model';
import { Helper } from '../../common/services/helper.service';


@Injectable()
export class NoticeService {
  noticeInterval: any;
  headers: Headers;
  notices: Notice[] = [];
  noCheckNotices: Notice[] = [];
  requestOptions: RequestOptions;

  userUpdateAvatarAPI: string = this.helper.getAPI('user/update-avatar');


  //
  // constructor
  constructor(
    private events: Events,
    private http: Http,
    private helper: Helper
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }


  //
  // get index
  getIndex(): Promise<Notice> {
    let api: string = this.helper.getAPI('notice');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then((response) => {
      this.notices = response.json();
      this.noCheckNotices = this.notices.filter((notice) => {
        return !Boolean(notice.is_checked);
      })
      this.events.publish('notice:getIndex', {num: this.noCheckNotices.length});
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // check
  check(params): Promise<Notice> {
    let api: string = this.helper.getAPI('notice/check');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then((response) => {
      this.notices = response.json();
      this.noCheckNotices = this.notices.filter((notice) => {
        return !Boolean(notice.is_checked);
      })
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // destroy
  destroy(params): Promise<Notice> {
    let api: string = this.helper.getAPI('notice/destroy');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then((response) => {
      this.notices = response.json();
      this.noCheckNotices = this.notices.filter((notice) => {
        return !Boolean(notice.is_checked);
      })
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
