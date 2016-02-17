/**
 * functions
 */

// Get Api Url
function getApiUrl(url) {
    if (APP_ENV_DEV) {
        return HOST_API_DEV + '/api' + url;
    } else {
        return HOST_API + '/api' + url;
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


// In Array
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}


// Get Parameter By Name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
