HeyCommunity

.service('TimelineService', ['$http', '$rootScope', 'UtilityService', function($http, $rootScope, UtilityService) {
    //
    //
    var self = this;
    self.timelines = [];
    self.timelineLikes = [];


    //
    //
    self.saveInLocalStorage = function() {
        localStorage.timelines = JSON.stringify(self.timelines);
        localStorage.timelineLikes = JSON.stringify(self.timelineLikes);
    }


    //
    //
    self.getByLocalStorage = function() {
        if (localStorage.timelines) {
            self.timelines = JSON.parse(localStorage.timelines);
        }

        if (localStorage.timelineLikes) {
            self.timelineLikes = JSON.parse(localStorage.timelineLikes);
        }
    }


    //
    //
    self.index = function(params) {
        var url = getApiUrl('/timeline');
        if (typeof(params) == 'object' && 'type' in params && self.timelines.length > 0) {
            if (params.type === 'refresh') {
                var id = $rootScope.filter('orderBy')(self.timelines, '-id')[0].id;
                url = url + '?type=' + params.type + '&id=' + id;
            } else if (params.type === 'infinite') {
                var id = $rootScope.filter('orderBy')(self.timelines, 'id')[0].id;
                url = url + '?type=' + params.type + '&id=' + id;
            }
        }

        var q = $http.get(url);
        q.then(function(response) {
            if (response.status == 200) {
                self.timelines = self.timelines.concat(response.data.timelines);
                self.timelineLikes = response.data.likes;

                self.saveInLocalStorage();
            } else {
                UtilityService.showNoticeFail();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    // show
    self.show = function(params) {
        var q = $http.get(getApiUrl('/timeline/show/' + params.id));
        q.then(function(response) {
            if (response.status === 200) {
                angular.forEach(self.timelines, function(value, key) {
                    if (value.id === response.data.id) {
                        self.timelines[key] = response.data;
                    }
                });

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    // store
    self.store = function(http, params) {
        var q = http.upload({
            url: getApiUrl('/timeline/store'),
            data: params
        });

        q.then(function() {
            //
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    //
    // destory
    self.destroy = function(params) {
        var q = $http.post(getApiUrl('/timeline/destroy'), params);
        q.then(function(response) {
            if (response.status == 200) {
                angular.forEach(self.timelines, function(value, key) {
                    if (value.id === params.id) {
                        delete self.timelines.splice(key, 1);
                    }
                });

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })


        return q;
    }


    //
    // is like
    self.isLike = function(id) {
        if (self.timelineLikes !== undefined) {
            return inArray(id, self.timelineLikes);
        } else {
            return false;
        }
    }


    //
    // like
    self.like = function(params) {
        var q = $http.post(getApiUrl('/timeline/like'), params);
        q.then(function(response) {
            if (response.status === 200) {
                angular.forEach(self.timelines, function(value, key) {
                    if (value.id === response.data.id) {
                        self.timelines[key] = response.data;

                        if (self.isLike(value.id)) {
                            var i = self.timelineLikes.indexOf(response.data.id);
                            self.timelineLikes.splice(i, 1);
                        } else {
                            self.timelineLikes.push(response.data.id);
                        }
                    }
                });

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    // comment
    self.commentPublish = function(params) {
        var q = $http.post(getApiUrl('/timeline/comment-publish'),  params);
        q.then(function(response) {
            if (response.status === 200) {
                angular.forEach(self.timelines, function(value, key) {
                    if (value.id === response.data.id) {
                        self.timelines[key] = response.data;
                    }
                });

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }
}])
