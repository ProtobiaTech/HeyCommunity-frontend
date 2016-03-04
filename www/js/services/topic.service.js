HeyCommunity

.service('TopicService', ['$http', function($http) {
    // index
    this.index = function() {
        return $http.get(getApiUrl('/topic'));
    }


    // show
    this.show = function(params) {
        return $http.get(getApiUrl('/topic/show/' + params.id));
    }
}])
