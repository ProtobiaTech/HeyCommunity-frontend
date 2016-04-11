HeyCommunity

.service('TimelineService', ['$http', function($http) {
    this.index = function(params) {
        if (typeof(params) == 'object' && 'page' in params) {
            var url = getApiUrl('/timeline') + '?page=' + params.page + '&';
        } else {
            var url = getApiUrl('/timeline') + '?';
        }
        if (typeof(params) == 'object' && 'user_id' in params) {
            url = url + 'where[key]=user_id&where[value]=' + params.user_id;
        }
        if (typeof(params) == 'object' && 'type' in params) {
            url = url + 'type=' + params.type + '&id=' + params.id;
        }

        return $http.get(url);
    }


    // show
    this.show = function(params) {
        return $http.get(getApiUrl('/timeline/show/' + params.id));
    }


    // store
    this.store = function(http, params) {
        return http.upload({
            url: getApiUrl('/timeline/store'),
            data: params
        });
    }


    //
    // destory
    this.destroy = function(params) {
        return $http.post(getApiUrl('/timeline/destroy'), params);
    }


    // like
    this.like = function(params) {
        return $http.post(getApiUrl('/timeline/like'), params);
    }


    // comment
    this.commentPublish = function(params) {
        return $http.post(getApiUrl('/timeline/comment-publish'),  params);
    }
}])
