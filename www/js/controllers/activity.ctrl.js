HeyCommunity

.controller('ActivityCtrl', ['$scope', 'ActivityService', function($scope, ActivityService) {
    ActivityService.index().then(function(response) {
        $scope.activities = response.data.data;
    });
}])
