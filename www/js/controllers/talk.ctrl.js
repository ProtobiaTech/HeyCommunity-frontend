HeyCommunity

// tab.talk
.controller('TalkCtrl', ['$scope', 'TalkService', function($scope, TalkService) {
    TalkService.index().then(function(response) {
        $scope.talks = response.data.data;
    });
}])

// tab.talk-ing
.controller('TalkIngCtrl', ['$scope', 'TalkService', function($scope, TalkService) {
}]);
