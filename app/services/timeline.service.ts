import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Timeline} from '../models/timeline.model';


@Injectable()
export class TimelineService {
  constructor(private http: Http) { }

  private timelinesUrl = 'api/timeline';

  //
  //
  getTimelines(): Promise<Timeline[]> {
    return this.http.get(this.timelinesUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  refresh(params): Promise<Timeline[]> {
    return this.http.get('api/timeline?type=refresh&id=' + params.id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  infinite(params): Promise<Timeline[]> {
    return this.http.get('api/timeline?type=infinite&id=' + params.id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //
  //
  setLike(timeline): Promise<Timeline> {
    let api: string = 'api/timeline/set-like';
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
