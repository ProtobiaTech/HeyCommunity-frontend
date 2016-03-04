HeyCommunity

// tab.topic
.controller('TopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    TopicService.index().then(function(response) {
        if (response.status == 200) {
            $scope.topics = response.data.data;
            $scope.currentPage = response.data.current_page;
        }
    });

    //
    // do refresh
    $scope.doRefresh = function() {
        TopicService.index().then(function(response) {
            console.debug('### TopicService.doRefresh response', response);
            if (response.status == 200) {
                $scope.topics = response.data.data;
                $scope.currentPage = response.data.current_page;
            }
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    // load more
    $scope.loadMore = function() {
        var params = {
            page: $scope.currentPage + 1,
        }
        console.debug('### TopicService.loadMore params', params);
        TopicService.index(params).then(function(response) {
            console.debug('### TopicService.loadMore response', response);
            if (response.status == 200) {
                $scope.topics = $scope.topics.concat(response.data.data);
                $scope.currentPage = response.data.current_page;
            }
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

}])



// tab.topic-detail
.controller('TopicDetailCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    $scope.$root.$broadcast('loading:show');
    TopicService.show({id: $scope.stateParams.id}).then(function(response) {
        $scope.Topic = response.data;
    });

    $scope.commentPublish = function() {
        $scope.$root.$broadcast('loading:show');

        var params = {
            id: $scope.stateParams.id,
            content: $scope.TopicComment.content,
        }
        console.debug('### TopicService.commentPublish params', params);
        TopicService.commentPublish(params).then(function(response) {
            console.debug('### TopicService.commentPublish response', response);
            if (response.status == 200) {
                $scope.state.reload();
            }
        });
    }
}]);
