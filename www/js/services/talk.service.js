HeyCommunity

.service('TalkService', function($http) {
    this.index = function() {
        return $http.get(getApiUrl('/talk'));
    }
})
