HeyCommunity

// hey.activity
.controller('ActivityCtrl', ['$scope', 'ActivityService', function($scope, ActivityService) {
    ActivityService.index().then(function(response) {
        $scope.activities = response.data.data;
    });
}])


// hey.activity
.controller('ActivityCreateCtrl', ['$scope', 'ActivityService', function($scope, ActivityService) {
    $scope.activity = {};

    $scope.store = function() {
        var params = {
            title: $scope.activity.title,
            avatar: 'avatar', // @todo $scope.activity.avatar,
            content: $scope.activity.content,
            start_date: $scope.activity.start_date,
            end_date: $scope.activity.end_date,
        }

        console.debug('### ActivityService.store params', params);
        ActivityService.store(params).then(function(response) {
            console.debug('### ActivityService.store response', response);
            if (response.status == 200) {
                $scope.state.go('hey.activity');
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
