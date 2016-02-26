/**
 * Config
 */


if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
    HOST_API        =   window.location.protocol + '//' + window.location.hostname;
    HOST_API_DEV    =   'http://api.hey-community.cn';
} else {
    HOST_API        =   'http://api.hey-community.cn';
    // HOST_API_DEV    =   'http://superods-macbook.local';
    HOST_API_DEV    =   'http://api.hey-community.cn';
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
