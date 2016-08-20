import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class Helper {
  constructor(private http: Http) {
  }


  //
  //
  getAPI(uri): string {
    return '/api/' + uri;
    // return 'http://new-app.heycommunity.com/api/' + string;
  }


  //
  //
  getImg(uri): string {
    return 'http://backend.heycommunity.local/' + uri;
    // return 'http://new-app.heycommunity.com' + uri;
  }
}
