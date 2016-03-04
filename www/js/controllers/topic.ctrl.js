HeyCommunity

// tab.topic
.controller('TopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    TopicService.index().then(function(response) {
        $scope.topics = response.data.data;
    });
}])

// tab.topic-detail
.controller('TopicDetailCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    $scope.$root.$broadcast('loading:show');
    TopicService.show({id: $scope.stateParams.id}).then(function(response) {
        $scope.Topic = response.data;
    });
}]);
