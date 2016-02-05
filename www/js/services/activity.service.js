HeyCommunity

.service('ActivityService', ['$http', function($http) {
    // index
    this.index = function() {
        return $http.get(getApiUrl('/activity/index'));
    }


    // store
    this.store = function(http, params) {
        return http.upload({
            url: getApiUrl('/activity/store'),
            data: params,
        });
    }


    // show
    this.show = function(params) {
        return $http.get(getApiUrl('/activity/show/' + params.id));
    }


    // like
    this.like = function(params) {
        return $http.post(getApiUrl('/activity/like'), params);
    }


    // attend
    this.attend = function(params) {
        return $http.post(getApiUrl('/activity/attend'), params);
    }


    // comment
    this.commentPublish = function(params) {
        return $http.post(getApiUrl('/activity/comment-publish'),  params);
    }
}])
