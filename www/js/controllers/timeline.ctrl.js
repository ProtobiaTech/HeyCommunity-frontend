HeyCommunity

.controller('TimelineCtrl', function($scope, TimelineService) {
    TimelineService.index().then(function(response) {
        $scope.timelines = response.data.data;
    });
})
