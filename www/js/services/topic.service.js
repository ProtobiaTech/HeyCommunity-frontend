HeyCommunity

.service('TopicService', ['$http', function($http) {
    // index
    this.index = function(params) {
        if (typeof(params) == 'object' && 'page' in params) {
            var url = getApiUrl('/topic') + '?page=' + params.page;
        } else {
            var url = getApiUrl('/topic');
        }
        return $http.get(url);
    }


    // show
    this.show = function(params) {
        return $http.get(getApiUrl('/topic/show/' + params.id));
    }
}])
