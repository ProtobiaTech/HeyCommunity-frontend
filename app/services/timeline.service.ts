import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Timeline} from '../models/timeline.model';
import {Helper} from '../other/helper.component';


@Injectable()
export class TimelineService {
  timelines: Timeline[] = [];

  constructor(
    private http: Http,
    private helper: Helper
  ) {
    this.timelines = [];
  }

  //
  //
  getTimelines(): Promise<Timeline[]> {
    return this.http.get(this.helper.getAPI('timeline'))
      .toPromise()
      .then(response => {
        this.timelines = response.json();
        return response.json();
      })
      .catch(this.handleError);
  }


  //
  //
  refresh(params): Promise<Timeline[]> {
    return this.http.get(this.helper.getAPI('timeline?type=refresh&id=' + params.id))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  infinite(params): Promise<Timeline[]> {
    return this.http.get(this.helper.getAPI('timeline?type=infinite&id=' + params.id))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  setLike(timeline): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/set-like');
    let data: any = {id: timeline.id};

    // return timeline;
    return this.http.post(api, data)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  store(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/store');
    let data: any = {content: params.content};

    return this.http.post(api, data)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  update(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/update');
    let data: any = {content: params.content};

    return this.http.post(api, data)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  destroy(params): Promise<Timeline> {
    let api: string = this.helper.getAPI('timeline/destroy');
    let data: any = {id: params.id};

    return this.http.post(api, data)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  //
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
