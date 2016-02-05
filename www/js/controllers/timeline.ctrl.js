HeyCommunity

// hey.timeline
.controller('TimelineCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    TimelineService.index().then(function(response) {
        $scope.timelines = response.data.data;
    });


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
                        v.like_num += 1;
                    }
                })
            }
        })
    }
}])


// hey.timeline-create
.controller('TimelineCreateCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    $scope.Timeline = {};

    $scope.store = function() {
        var params = {
            attachment: 'avatar', // @todo $scope.Timeline.avatar,
            content: $scope.Timeline.content,
        }

        console.debug('### TimelineService.store params', params);
        TimelineService.store(params).then(function(response) {
            console.debug('### TimelineService.store response', response);
            if (response.status == 200) {
                $scope.state.go('hey.timeline');
            } else {
                $scope.formErrors = response.data;
            }
        });
    }
}])
