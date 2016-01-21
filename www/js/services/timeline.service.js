HeyCommunity

.service('TimelineService', ['$http', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/timeline'));
    }
}])
