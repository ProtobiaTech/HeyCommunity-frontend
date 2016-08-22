import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Timeline} from '../models/timeline.model';
import {Helper} from '../other/helper.component';


@Injectable()
export class TimelineService {
  timelineStoreImgAPI: string = this.helper.getAPI('timeline/store-img');
  timelines: Timeline[] = [];

  constructor(
    private http: Http,
    private helper: Helper
  ) {
  }

  //
  // get timelines
  getTimelines(params?): Promise<Timeline[]> {
    let api: string = this.helper.getAPI('timeline');

    return this.http.get(api)
    .toPromise()
    .then(response => {
      this.timelines = response.json();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // refresh
  refresh(params): Promise<Timeline[]> {
    let api: string = this.helper.getAPI('timeline?type=refresh&id=' + params.id);

    return this.http.get(api)
    .toPromise()
    .then(response => {
      let timelines = response.json();
      this.timelines = timelines.concat(this.timelines);
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // infinite
  infinite(params): Promise<Timeline[]> {
    let api: string = this.helper.getAPI('timeline?type=infinite&id=' + params.id);

    return this.http.get(api)
    .toPromise()
    .then(response => {
      let timelines = response.json();
      this.timelines = this.timelines.concat(timelines);
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // set like
  setLike(timeline): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/set-like');
    let data: any = {id: timeline.id};

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // store
  store(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/store');

    return this.http.post(api, params)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // update
  update(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/update');
    let data: any = {content: params.content};

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // destroy
  destroy(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/destroy');
    let data: any = {id: params.id};

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // store comment
  storeComment(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/store-comment');
    let data: any = {timeline_id: params.timeline_id, content: params.content};

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // handle error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
