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
      return 'http://v2.hey-community.com/api/' + uri;
    } else {
      return '/api/' + uri;
    }
  }


  //
  //
  getImg(uri): string {
    if (this.platform.is('cordova')) {
      return 'http://public.hey-community.cn/' + uri + '?imageView/2/w/800';
    } else {
      return uri + '?imageView/2/w/800';
    }
  }
}
