/**
 * functions
 */

// Get Api Url
function getApiUrl(url) {
    if (APP_ENV_DEV) {
        return HOST_API_DEV + url;
    } else {
        return HOST_API + url;
    }
}


// Get Pic Url
function getPicUrl(url) {
    if (url.substring(0, 4) == 'http') {
        return url;
    } else {
        if (APP_ENV_DEV) {
            return HOST_API_DEV + url;
        } else {
            return HOST_API + url;
        }
    }
}
