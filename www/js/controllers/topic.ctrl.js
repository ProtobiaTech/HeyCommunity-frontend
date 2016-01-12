HeyCommunity

// tab.user
.controller('TopicCtrl', function($scope, TopicService) {
    TopicService.index().then(function(response) {
        $scope.topics = response.data.data;
    });
});
