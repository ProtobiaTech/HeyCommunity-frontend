HeyCommunity

.service('ActivityService', ['$http', function($http) {
    // index
    this.index = function() {
        return $http.get(getApiUrl('/activity'));
    }


    // store
    this.store = function(params) {
        return $http.post(getApiUrl('/activity'), params);
    }


    // show
    this.show = function(params) {
        return $http.get(getApiUrl('/activity/' + params.id));
    }
}])
