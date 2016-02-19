/**
 * Config
 */


HOST_API            =   'http://demo.hey-community.cn';
if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
    HOST_API_DEV    =   window.location.protocol + '//' + window.location.hostname;
} else {
    HOST_API_DEV    =   'http://superods-macbook.local';
}


// auto set APP_ENV_DEV
if (getParameterByName('deving') === 'true') {
    APP_ENV_DEV     =   true;
} else {
    APP_ENV_DEV     =   false;
}
// APP_ENV_DEV     =   true;


if (!APP_ENV_DEV) {
    var empty_func = function() {
    };
    console.debug = empty_func;
}
