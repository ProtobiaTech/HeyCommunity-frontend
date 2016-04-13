HeyCommunity

.service('TimelineService', ['$http', function($http) {
    //
    //
    var self = this;
    self.timelines = [];
    self.timelineLikes = [];


    //
    //
    self.index = function(params) {
        var url = getApiUrl('/timeline');
        if (typeof(params) == 'object' && 'type' in params) {
            url = url + '?type=' + params.type + '&id=' + params.id;
        }

        var q = $http.get(url);
        q.then(function(response) {
            if (response.status == 200) {
                if (params !== undefined) {
                    if (params.type === 'refresh') {
                        while (response.data.timelines.length > 0) {
                            self.timelines.unshift(response.data.timelines.shift());
                        }
                    } else if (params.type === 'infinite') {
                        self.timelines = self.timelines.concat(response.data.timelines);
                    }

                    self.timelineLikes = response.data.likes;
                } else {
                    self.timelines = response.data.timelines;
                    self.timelineLikes = response.data.likes;
                }

                localStorage.timelines = JSON.stringify(self.timelines);
                localStorage.timelineLikes = JSON.stringify(self.timelineLikes);
            }
        })

        return q;
    }


    // show
    self.show = function(params) {
        return $http.get(getApiUrl('/timeline/show/' + params.id));
    }


    // store
    self.store = function(http, params) {
        return http.upload({
            url: getApiUrl('/timeline/store'),
            data: params
        });
    }


    //
    // destory
    self.destroy = function(params) {
        return $http.post(getApiUrl('/timeline/destroy'), params);
    }


    // like
    self.like = function(params) {
        return $http.post(getApiUrl('/timeline/like'), params);
    }


    // comment
    self.commentPublish = function(params) {
        return $http.post(getApiUrl('/timeline/comment-publish'),  params);
    }
}])
