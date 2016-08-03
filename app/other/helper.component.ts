import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class Helper {
  constructor(private http: Http) {
  }


  //
  //
  getAPI(string): string {
    return '/api/' + string;
    // return 'http://new-app.heycommunity.com/api/' + string;
  }
}
