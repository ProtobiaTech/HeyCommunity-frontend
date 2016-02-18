HeyCommunity

.service('TimelineService', ['$http', function($http) {
    this.index = function(params) {
        if (typeof(params) == 'object' && 'page' in params) {
            var url = getApiUrl('/timeline') + '?page=' + params.page;
        } else {
            var url = getApiUrl('/timeline');
        }
        return $http.get(url);
    }


    // store
    this.store = function(http, params) {
        return http.upload({
            url: getApiUrl('/timeline/store'),
            data: params
        });
    }


    // like
    this.like = function(params) {
        return $http.post(getApiUrl('/timeline/like'), params);
    }
}])
