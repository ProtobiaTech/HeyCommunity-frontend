HeyCommunity

.service('TopicService', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/topic'));
    }
})
