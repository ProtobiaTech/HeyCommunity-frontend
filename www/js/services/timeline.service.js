HeyCommunity

.service('TimelineService', ['$http', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/timeline'));
    }


    // store
    this.store = function(params) {
        return $http.post(getApiUrl('/timeline/store'), params);
    }


    // like
    this.like = function(params) {
        return $http.post(getApiUrl('/timeline/like'), params);
    }
}])
