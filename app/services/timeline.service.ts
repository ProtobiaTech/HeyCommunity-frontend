import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import {Timeline} from '../models/timeline.model';
import {Helper} from '../other/helper.component';


@Injectable()
export class TimelineService {
  storage = new Storage(LocalStorage);
  timelineStoreImgAPI: string = this.helper.getAPI('timeline/store-img');
  timelines: Timeline[] = [];
  CACHE_TIMELINES: string = 'cache_timelines';

  headers: Headers;
  requestOptions: RequestOptions;

  constructor(
    private http: Http,
    private helper: Helper
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }

  //
  // get timelines
  getTimelines(params?): Promise<Timeline[]> {
    //
    this.storage.get(this.CACHE_TIMELINES).then(value => {
      let timelines = JSON.parse(value);
      this.timelines = timelines;
    });

    //
    let api: string = this.helper.getAPI('timeline');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      this.timelines = response.json();
      this.storageTimelines();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // refresh
  refresh(params): Promise<Timeline[]> {
    let api: string = this.helper.getAPI('timeline?type=refresh&id=' + params.id);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let timelines = response.json();
      this.timelines = timelines.concat(this.timelines);
      this.storageTimelines();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // infinite
  infinite(params): Promise<Timeline[]> {
    let api: string = this.helper.getAPI('timeline?type=infinite&id=' + params.id);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let timelines = response.json();
      this.timelines = this.timelines.concat(timelines);
      this.storageTimelines();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // set like
  setLike(timeline): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/set-like');
    let data: any = {id: timeline.id};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // store
  store(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/store');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // update
  update(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/update');
    let data: any = {content: params.content};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // destroy
  destroy(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/destroy');
    let data: any = {id: params.id};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // store comment
  storeComment(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/store-comment');
    let data: any = {timeline_id: params.timeline_id, content: params.content};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  //
  storageTimelines() {
    let timelines = JSON.stringify(this.timelines);
    this.storage.set(this.CACHE_TIMELINES, timelines);
  }


  //
  // handle error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
