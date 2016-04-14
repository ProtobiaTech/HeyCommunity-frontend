HeyCommunity

// tab.topic
.controller('TopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    $scope.TopicService = TopicService;

    if (localStorage.topics) {
        $scope.TopicService.topics = JSON.parse(localStorage.topics);
    } else {
        $scope.$root.loadingShowDisabled = true;
        TopicService.index();
    }

    //
    // do refresh
    $scope.doRefresh = function() {
        $scope.$root.loadingShowDisabled = true;

        if ($scope.TopicService.topics.length > 0) {
            var params = {
                type:   'refresh',
                id:     $scope.TopicService.topics[0].id,
            }
        }
        TopicService.index(params).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    // load more
    $scope.loadMore = function() {
        $scope.$root.loadingShowDisabled = true;

        if ($scope.TopicService.topics.length > 0) {
            var params = {
                type:   'infinite',
                id:     $scope.TopicService.topics[$scope.TopicService.topics.length - 1].id,
            }
        }
        TopicService.index(params).then(function(response) {
            if (response.status == 200) {
                if (response.data.length <= 0) {
                    $scope.loadMoreDisabled = true;
                }
            }
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

}])



// tab.topic-detail
.controller('TopicDetailCtrl', ['$scope', 'TopicService', '$ionicActionSheet', '$ionicHistory', function($scope, TopicService, $ionicActionSheet, $ionicHistory) {
    $scope.TopicComment = {};
    $scope.Topic = TopicService.topics[$scope.stateParams.id];

    TopicService.show({id: $scope.stateParams.topicId}).then(function(response) {
        $scope.Topic = response.data;
    });


    $scope.commentPublish = function() {
        var params = {
            id: $scope.stateParams.topicId,
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

    $scope.destroy = function() {
        var params = {
            id: $scope.stateParams.topicId,
        }
        TopicService.destroy(params).then(function(response) {
            if (response.status === 200) {
                $ionicHistory.clearCache();
                $scope.state.go('hey.topic', {}, {reload: true});
            } else {
                $scope.utility.showNoticeFail();
            }
        });
    }

    //
    $scope.showActionSheet = function() {
        var hideSheet = $ionicActionSheet.show({
            destructiveText: $scope.filter('translate')('DESTROY'),
            titleText: $scope.filter('translate')('MANAGEMENT_OPERATIONS'),
            cancelText: $scope.filter('translate')('CANCEL'),
            cancel: function() {
            },
            buttonClicked: function(index) {
                return true;
            },
            destructiveButtonClicked: function(index) {
                $scope.destroy();
            },
        });

        $scope.timeout(function() {
            hideSheet();
        }, 2000);
    };
}])



// tab.topic-create
.controller('TopicCreateCtrl', ['$scope', 'TopicService', 'Upload', function($scope, TopicService, Upload) {
    $scope.topic = {};

    $scope.store = function() {
        var params = {
            title: $scope.topic.title,
            // avatar: $scope.topic.avatar,
            content: $scope.topic.content,
        }

        console.debug('### TopicService.store params', params);
        TopicService.store(Upload, params).then(function(response) {
            console.debug('### TopicService.store response', response);
            if (response.status == 200) {
                $scope.state.go('hey.topic', {}, {reload: true});
            } else {
                $scope.utility.showAlert({title: $scope.filter('translate')('ERROR'), content: response.data});
            }
        });
    }
}])
