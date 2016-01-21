HeyCommunity

.service('TopicService', ['$http', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/topic'));
    }
}])
