import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

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
