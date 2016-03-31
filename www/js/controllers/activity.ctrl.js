HeyCommunity

// hey.activity
.controller('ActivityCtrl', ['$scope', 'ActivityService', function($scope, ActivityService) {
    ActivityService.index().then(function(response) {
        if (response.status == 200) {
            $scope.activities = response.data.data;
            $scope.activityCurrentPage = response.data.current_page;
        }
    });

    //
    // do refresh
    $scope.doRefresh = function() {
        ActivityService.index().then(function(response) {
            console.debug('### ActivityService.doRefresh response', response);
            if (response.status == 200) {
                $scope.activities = response.data.data;
                $scope.activityCurrentPage = response.data.current_page;
            }
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    // load more
    $scope.loadMore = function() {
        var params = {
            page: $scope.activityCurrentPage + 1,
        }
        console.debug('### ActivityService.loadMore params', params);
        ActivityService.index(params).then(function(response) {
            console.debug('### ActivityService.loadMore response', response);
            if (response.status == 200) {
                $scope.activities = $scope.activities.concat(response.data.data);
                $scope.activityCurrentPage = response.data.current_page;
            }
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
}])


// hey.activity
.controller('ActivityCreateCtrl', ['$scope', 'ActivityService', 'Upload', function($scope, ActivityService, Upload) {
    $scope.activity = {};

    $scope.store = function() {
        var params = {
            title: $scope.activity.title,
            avatar: $scope.activity.avatar,
            content: $scope.activity.content,
            start_date: $scope.activity.start_date,
            end_date: $scope.activity.end_date,
        }

        console.debug('### ActivityService.store params', params);
        ActivityService.store(Upload, params).then(function(response) {
            console.debug('### ActivityService.store response', response);
            if (response.status == 200) {
                $scope.state.go('hey.activity', {}, {reload: true});
            } else {
                $scope.formErrors = response.data;
            }
        });
    }
}])


// hey.activity-detail
.controller('ActivityDetailCtrl', ['$scope', 'ActivityService', function($scope, ActivityService) {
    $scope.ActivityComment = {};

    ActivityService.show({id: $scope.stateParams.id}).then(function(response) {
        console.debug('### ActivityService.show response', response);
        if (response.status == 200) {
            $scope.Activity = response.data.Activity;
            $scope.attends = response.data.attends;
            $scope.comments = response.data.comments;
        } else {
            $scope.state.go('hey.activity');
        }
    });


    // attend
    $scope.attend = function() {
        var params = {id: $scope.stateParams.id};
        console.debug('### ActivityService.attend params', params);

        ActivityService.attend(params).then(function(response) {
            console.debug('### ActivityService.attend response', response);
            if (response.status == 200) {
                $scope.state.reload();
            }
        });
    }


    // like
    $scope.like = function() {
        var params = {id: $scope.stateParams.id};
        console.debug('### ActivityService.like params', params);

        ActivityService.like(params).then(function(response) {
            console.debug('### ActivityService.like response', response);
            if (response.status == 200) {
                $scope.state.reload();
            }
        });
    }


    // comment publish
    $scope.commentPublish = function() {
        var params = {
            id: $scope.stateParams.id,
            content: $scope.ActivityComment.content,
        }
        console.debug('### ActivityService.commentPublish params', params);
        ActivityService.commentPublish(params).then(function(response) {
            console.debug('### ActivityService.commentPublish response', response);
            if (response.status == 200) {
                $scope.state.reload();
            }
        });
    }
}])
