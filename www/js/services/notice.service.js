HeyCommunity

.service('NoticeService', ['$http', function($http) {
    this.index = function(params) {
        if (typeof(params) == 'object' && 'page' in params) {
            var url = getApiUrl('/notice') + '?page=' + params.page + '&';
        } else {
            var url = getApiUrl('/notice') + '?';
        }
        if (typeof(params) == 'object' && 'user_id' in params) {
            url = url + 'where[key]=user_id&where[value]=' + params.user_id;
        }

        return $http.get(url);
    }
}])
