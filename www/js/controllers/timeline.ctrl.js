HeyCommunity

// hey.timeline
.controller('TimelineCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    TimelineService.index().then(function(response) {
        if (response.status == 200) {
            $scope.timelines = response.data.data;
            $scope.timelineCurrentPage = response.data.current_page;
        }
    });

    //
    // like
    $scope.like = function(id) {
        var params = {
            id: id,
        }
        console.debug('### TimelineService.like params', params);
        TimelineService.like(params).then(function(response) {
            console.debug('### TimelineService.like response', response);
            if (response.status == 200) {
                angular.forEach($scope.timelines, function(v) {
                    if (id == v.id) {
                        v.like_num = parseInt(v.like_num) + 1;
                    }
                })
            }
        })
    }

    //
    // do refresh
    $scope.doRefresh = function() {
        TimelineService.index().then(function(response) {
            console.debug('### TimelineService.doRefresh response', response);
            if (response.status == 200) {
                $scope.timelines = response.data.data;
                $scope.timelineCurrentPage = response.data.current_page;
            }
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    // load more
    $scope.loadMore = function() {
        var params = {
            page: $scope.timelineCurrentPage + 1,
        }
        console.debug('### TimelineService.loadMore params', params);
        TimelineService.index(params).then(function(response) {
            console.debug('### TimelineService.loadMore response', response);
            if (response.status == 200) {
                $scope.timelines = $scope.timelines.concat(response.data.data);
                $scope.timelineCurrentPage = response.data.current_page;
            }
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
}])


// hey.timeline-create
.controller('TimelineCreateCtrl', ['$scope', 'TimelineService', 'Upload', function($scope, TimelineService, Upload) {
    $scope.Timeline = {};

    $scope.store = function() {
        $scope.$root.$broadcast('loading:show');

        var params = {
            attachment: $scope.Timeline.avatar,
            content: $scope.Timeline.content,
        }

        console.debug('### TimelineService.store params', params);
        TimelineService.store(Upload, params).then(function(response) {
            console.debug('### TimelineService.store response', response);
            if (response.status == 200) {
                $scope.state.go('hey.timeline');
            } else {
                $scope.formErrors = response.data;
            }
        });
    }
}])
