/**
 * Config
 */

CDN_DOMAIN          =   'http://public.hey-community.cn';

API_PRODUCT         =   'http://api.hey-community.cn';
API_DEVING          =   'http://api.hey-community.local';









// auto set API
if (getParameterByName('env') === 'deving') {
    API         =   API_DEVING;
    CDN_DOMAIN  =   API_DEVING;
} else if (getParameterByName('env') === 'testing') {
    API     =   API_PRODUCT;
} else {
    if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
        API     =   window.location.protocol + '//' + window.location.hostname;
    } else {
        API     =   API_PRODUCT;
    }
}

if (getParameterByName('api')) {
    API = 'http://' + getParameterByName('api');
}

console.debug('the API is: ' + API);
console.debug('the CDN_DOMAIN is: ' + CDN_DOMAIN);
