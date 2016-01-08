/**
 * Config
 */


HOST_API        =   'http://api.hey-community.online';
HOST_API_DEV    =   'http://api.hey-community.local';

// auto set APP_ENV_DEV
if (location.protocol === 'file:' || location.port === '80') {
    APP_ENV_DEV     =   false;
} else {
    APP_ENV_DEV     =   true;
}

// APP_ENV_DEV     =   false;
