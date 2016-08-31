import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Notice} from '../models/notice.model';
import {Helper} from '../other/helper.component';


@Injectable()
export class NoticeService {
  headers: Headers;
  notices: Notice[] = [];
  requestOptions: RequestOptions;

  userUpdateAvatarAPI: string = this.helper.getAPI('user/update-avatar');

  //
  //
  constructor(
    private http: Http,
    private helper: Helper
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }


  //
  //
  getIndex(): Promise<Notice> {
    let api: string = this.helper.getAPI('notice/index');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then((response) => {
      this.notices = response.json();
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
