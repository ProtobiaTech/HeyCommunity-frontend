HeyCommunity

.service('TimelineService', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/timeline'));
    }
})
