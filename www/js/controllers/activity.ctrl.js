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
        console.group('### ActivityCreateCtrl Store');
        var params = {
            title: $scope.activity.title,
            avatar: 'avatar', // @todo $scope.activity.avatar,
            content: $scope.activity.content,
            start_date: $scope.activity.start_date,
            end_date: $scope.activity.end_date,
        }

        console.debug('## params', params);
        ActivityService.store(params).then(function(response) {
            console.debug('## response', response);

            if (response.status == 200) {
                $scope.state.go('hey.activity');
            } else {
                $scope.formErrors = response.data;
            }
            console.groupEnd();
        });
    }
}])


// hey.activity
.controller('ActivityDetailCtrl', ['$scope', 'ActivityService', function($scope, ActivityService) {
}])
