/**
 * functions
 */

// Get Api Url
function getApiUrl(url) {
    return API + url;
}


// Get Pic Url
function getPicUrl(url) {
    if (url.substring(0, 4) == 'http') {
        return url;
    } else {
        return CDN + url;
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
    return results === undefined ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


// Get Time
function getMomentDate(date) {
    return moment.utc(date).format();
}
