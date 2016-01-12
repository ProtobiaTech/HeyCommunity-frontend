HeyCommunity

// tab.talk
.controller('TalkCtrl', function($scope, TalkService) {
    TalkService.index().then(function(response) {
        $scope.talks = response.data.data;
    });
})

// tab.talk-ing
.controller('TalkIngCtrl', function($scope, TalkService) {
});
