import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Http} from '@angular/http';


@Injectable()
export class Helper {
  constructor(
    private platform: Platform
  ) {
  }


  //
  //
  getAPI(uri): string {
    if (this.platform.is('cordova')) {
      return 'http://cloud.hey-community.com/api/' + uri;
    } else {
      return '/api/' + uri;
    }
  }


  //
  //
  getImg(uri): string {
    if (this.platform.is('cordova')) {
      return 'http://public.hey-community.cn/' + uri;
    } else {
      return uri;
    }
  }
}
