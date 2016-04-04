HeyCommunity

.service('TopicService', ['$http', function($http) {
    // index
    this.index = function(params) {
        if (typeof(params) == 'object' && 'page' in params) {
            var url = getApiUrl('/topic') + '?page=' + params.page + '&';
        } else {
            var url = getApiUrl('/topic') + '?';
        }
        if (typeof(params) == 'object' && 'user_id' in params) {
            url = url + 'where[key]=user_id&where[value]=' + params.user_id;
        }

        return $http.get(url);
    }


    // store
    this.store = function(http, params) {
        return http.upload({
            url: getApiUrl('/topic/store'),
            data: params
        });
    }


    //
    // destory
    this.destroy = function(params) {
        return $http.post(getApiUrl('/topic/destroy'), params);
    }


    // show
    this.show = function(params) {
        return $http.get(getApiUrl('/topic/show/' + params.id));
    }


    // comment
    this.commentPublish = function(params) {
        return $http.post(getApiUrl('/topic/comment-publish'),  params);
    }
}])
