/**
 * Config
 */


HOST_API        =   'http://api.hey-community.cn';
HOST_API_DEV    =   'http://api.hey-community.local';


// auto set APP_ENV_DEV
if (getParameterByName('deving') === 'true') {
    APP_ENV_DEV     =   true;
} else {
    APP_ENV_DEV     =   false;
}
// APP_ENV_DEV     =   false;


if (!APP_ENV_DEV) {
    var empty_func = function() {};
    console.group = console.groupEnd = empty_func;
    console.debug = empty_func;
}
