/**
 * functions
 */

function getApiUrl(url) {
    if (APP_ENV_DEV) {
        return HOST_API_DEV + url;
    } else {
        return HOST_API + url;
    }
}
