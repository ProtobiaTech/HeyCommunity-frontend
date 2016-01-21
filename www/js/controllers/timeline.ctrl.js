HeyCommunity

.controller('TimelineCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    TimelineService.index().then(function(response) {
        $scope.timelines = response.data.data;
    });
}])
