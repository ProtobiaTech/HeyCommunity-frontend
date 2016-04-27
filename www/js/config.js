/**
 * Config
 *
 * see doc:
 */

API_APP             =   'http://demo.hey-community.cn/api';             // app use the api
API_WEBAPP          =   "it's will be auto get from URL";               // webApp use the api

CDN_DOMAIN          =   'please use qiniu.com';                         // the cdn, Non-essential









// auto set API
if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
    // set API
    if (API_WEBAPP.substring(0, 4) == 'http') {
        API     =   API_WEBAPP;
    } else {
        API     =   window.location.protocol + '//' + window.location.hostname + '/api';
    }


    // set CDN
    if (getParameterByName('env') === undefined && CDN_DOMAIN.substring(0, 4) == 'http') {
        CDN =   CDN_DOMAIN;
    } else {
        CDN =   window.location.protocol + '//' + window.location.hostname;
    }
} else {
    API     =   API_APP;
}

console.debug('the API is: ' + API);
console.debug('the CDN is: ' + CDN);
