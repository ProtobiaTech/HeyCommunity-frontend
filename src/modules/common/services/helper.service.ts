import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { AuthService } from './auth.service';


@Injectable()
export class Helper {
  //
  // constructor
  constructor(
    public platform: Platform,
    public authService: AuthService,
    public translateService: TranslateService
  ) {
  }


  //
  // get api
  getAPI(uri): string {
    let apiDomain = (window as any).API_DOMAIN;

    if (apiDomain && apiDomain.substring(0, 4) == 'http') {
      return apiDomain + '/api/' + uri;
    } else {
      return (<any> window).location.href + 'api/' + uri;
    }
  }


  //
  // get asset url
  getAssetUri(uri): string {
    return uri;
  }


  //
  // get video
  getVideo(uri): string {
    return this.getAssetUri(uri);
  }


  //
  // get img
  getImg(uri): string {
    return this.getAssetUri(uri);
  }


  //
  // get parameter by name
  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  //
  // set Title
  setTitle(title?) {
    if (title) {
      this.translateService.get(title).subscribe((res: string) => {
        document.title = res;
      });
    }

    let i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function(){
        i.remove();
      }, 9)
    }

    document.body.appendChild(i);
  }
}
