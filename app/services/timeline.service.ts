import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Timeline} from '../models/timeline.model';
import {Helper} from '../other/helper.component';


@Injectable()
export class TimelineService {
  constructor(
    private http: Http,
    private helper: Helper
  ) { }

  //
  //
  getTimelines(): Promise<Timeline[]> {
    return this.http.get(this.helper.getAPI('timeline'))
      .toPromise()
      .then(response => response.json())
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
    let params: any = {id: timeline.id};

    // return timeline;

    return this.http.post(api, params)
      .toPromise()
      .then(response => response.json().timelines)
      .catch(this.handleError);
  }


  //
  //
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
