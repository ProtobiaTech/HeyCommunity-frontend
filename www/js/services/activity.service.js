HeyCommunity

.service('ActivityService', ['$http', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/activity'));
    }
}])
