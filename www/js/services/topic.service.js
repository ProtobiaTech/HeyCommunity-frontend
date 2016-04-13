HeyCommunity

.service('TopicService', ['$http', function($http) {
    //
    //
    var self = this;
    self.topics = [];


    //
    // index
    self.index = function(params) {
        var url = getApiUrl('/topic');
        if (typeof(params) == 'object' && 'type' in params) {
            url = url + '?type=' + params.type + '&id=' + params.id;
        }

        var q = $http.get(url);
        q.then(function(response) {
            if (response.status == 200) {
                if (params !== undefined) {
                    if (params.type === 'refresh') {
                        while (response.data.length > 0) {
                            self.topics.unshift(response.data.shift());
                        }
                    } else if (params.type === 'infinite') {
                        self.topics = self.topics.concat(response.data);
                    }
                } else {
                    self.topics = response.data;
                }

                localStorage.topics = JSON.stringify(self.topics);
            }
        })

        return q;
    }


    //
    // store
    self.store = function(http, params) {
        return http.upload({
            url: getApiUrl('/topic/store'),
            data: params
        });
    }


    //
    // destory
    self.destroy = function(params) {
        return $http.post(getApiUrl('/topic/destroy'), params);
    }


    //
    // show
    self.show = function(params) {
        return $http.get(getApiUrl('/topic/show/' + params.id));
    }


    //
    // comment
    self.commentPublish = function(params) {
        return $http.post(getApiUrl('/topic/comment-publish'),  params);
    }
}])
