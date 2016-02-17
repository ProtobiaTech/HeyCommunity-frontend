HeyCommunity

.service('TimelineService', ['$http', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/timeline'));
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
