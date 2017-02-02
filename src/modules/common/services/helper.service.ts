import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { AppConfig } from '../../../app/app.config';
import { AuthService } from './auth.service';


@Injectable()
export class Helper {
  appProtocol: string = AppConfig.APP_PROTOCOL;
  appApiDomain: string = AppConfig.APP_API_DOMAIN;
  appAssetDomain: string = AppConfig.APP_ASSET_DOMAIN;
  webAppCDNAssetDomain: string = AppConfig.WEBAPP_CDN_ASSET_DOMAIN;

  apiPath: string = '';
  assetPath: string = '';


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
    if (this.apiPath) {
      return this.apiPath + uri
    } else {
      if (this.platform.is('cordova')) {
        this.apiPath = this.appProtocol + this.appApiDomain + '/api/';
      } else {
        let api = this.getParameterByName('api')

        if (api) {
          this.apiPath = '//' + api + '/api/';
        } else {
          this.apiPath = '/api/';
        }
      }

      return this.apiPath + uri;
    }
  }


  //
  // get asset url
  getAssetUri(uri): string {
    if (uri && uri.substring(0, 4) == 'http') {
      return uri;
    } else if (this.assetPath) {
      return this.assetPath + uri;
    } else {
      if (this.platform.is('cordova')) {
        this.assetPath = this.appProtocol + this.appAssetDomain;
      } else {
        let api = this.getParameterByName('api')

        if (api) {
          this.assetPath = '//' + api;
        } else {
          if (this.webAppCDNAssetDomain) {
            this.assetPath = '//' + this.webAppCDNAssetDomain;
          } else {
            this.assetPath = '//' + location.host;
          }
        }
      }

      return this.assetPath + uri;
    }
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
