angular.module('starter.controller.timeline', [])

.controller('TimelineCtrl', function($scope, $http) {
    $http.get('/api/timeline').then(function(response) {
        $scope.timelines = response.data;
    });
})
