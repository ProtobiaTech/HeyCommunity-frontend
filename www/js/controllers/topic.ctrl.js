HeyCommunity

// tab.user
.controller('TopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    TopicService.index().then(function(response) {
        $scope.topics = response.data.data;
    });
}]);
