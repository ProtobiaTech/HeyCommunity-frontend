HeyCommunity

.service('TalkService', ['$http', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/talk'));
    }
}])
