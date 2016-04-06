HeyCommunity

// hey.timeline
.controller('TimelineCtrl', ['$scope', 'TimelineService', '$ionicActionSheet', function($scope, TimelineService, $ionicActionSheet) {
    $scope.$root.loadingShowDisabled = true;
    TimelineService.index().then(function(response) {
        if (response.status == 200) {
            $scope.timelines = response.data.timelines.data;
            $scope.timelineCurrentPage = response.data.timelines.current_page;

            $scope.timelineLikes = response.data.likes;
        }
    });

    //
    // is Like
    $scope.isLike = function(id) {
        return inArray(id, $scope.timelineLikes);
    }

    //
    // like
    $scope.like = function(id, isDoubleTap) {
        $scope.$root.loadingShowDisabled = true;
        if (isDoubleTap) {
            if ($scope.isLike(id)) {
                return true;
            }
        }
        if (!$scope.please_login_first()) {
            var params = {
                id: id,
            }
            console.debug('### TimelineService.like params', params);
            TimelineService.like(params).then(function(response) {
                console.debug('### TimelineService.like response', response);
                if (response.status == 200) {
                    angular.forEach($scope.timelines, function(v) {
                        if (id == v.id) {
                            // if (v.like_num > response.data.like_num) {
                            if ($scope.isLike(id)) {
                                var i = $scope.timelineLikes.indexOf(response.data.id);
                                $scope.timelineLikes.splice(i, 1);
                            } else {
                                $scope.timelineLikes.push(response.data.id);
                            }
                            v.like_num = response.data.like_num;
                        }
                    })
                    console.log($scope.timelineLikes)
                }
            })
        }
    }

    //
    // destroy
    $scope.destroy = function(id) {
        var data = {
            title: $scope.filter('translate')('ALERT'),
            content: $scope.filter('translate')('ARE_YOU_SURE_DESTROY_IT'),
        }

        $scope.showConfirm(data, function() {
            var params = {
                id: id,
            }
            TimelineService.destroy(params).then(function(response) {
                if (response.status === 200) {
                    angular.forEach($scope.timelines, function(value, key) {
                        if (value.id === params.id) {
                            delete $scope.timelines[key];

                            $scope.showNoticeSuccess();
                            $scope.timeout(function() {
                                $scope.$root.$broadcast('notice:hide');
                            }, 1288);
                        }
                    });
                }
            })
        }, function() {
        });
    }

    //
    // do refresh
    $scope.doRefresh = function() {
        $scope.$root.loadingShowDisabled = true;

        TimelineService.index().then(function(response) {
            console.debug('### TimelineService.doRefresh response', response);
            if (response.status == 200) {
                angular.merge($scope.timelines, response.data.timelines.data);
            }
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    // load more
    $scope.loadMore = function() {
        $scope.$root.loadingShowDisabled = true;

        var params = {
            page: $scope.timelineCurrentPage + 1,
        }
        console.debug('### TimelineService.loadMore params', params);
        TimelineService.index(params).then(function(response) {
            console.debug('### TimelineService.loadMore response', response);
            if (response.status == 200) {
                if (typeof response.data.timelines.data !== 'undefined' && response.data.timelines.data.length > 0) {
                    $scope.timelines = $scope.timelines.concat(response.data.timelines.data);
                    $scope.timelineCurrentPage = response.data.timelines.current_page;
                } else {
                    $scope.loadMoreDisabled = true;
                }
            }
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    //
    $scope.showActionSheet = function() {
        var hideSheet = $ionicActionSheet.show({
            titleText: $scope.filter('translate')('WHAT_IS_NEW'),
            buttons: [
                {text: $scope.filter('translate')('NEW_PHOTO')},
                {text: $scope.filter('translate')('NEW_VIDEO')},
            ],
            cancelText: $scope.filter('translate')('CANCEL'),
            cancel: function() {
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    $scope.state.go('hey-timeline-create');
                } else if (index === 1) {
                     $scope.showNoticeText('COMING_SOON');
                }
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


// hey.timeline-create
.controller('TimelineCreateCtrl', ['$scope', 'TimelineService', 'Upload', '$ionicScrollDelegate', function($scope, TimelineService, Upload, $ionicScrollDelegate) {
    $scope.Timeline = {};

    $scope.store = function() {
        var params = {
            attachment: $scope.Timeline.pic,
            content: $scope.Timeline.content,
        }

        console.debug('### TimelineService.store params', params);
        TimelineService.store(Upload, params).then(function(response) {
            console.debug('### TimelineService.store response', response);
            if (response.status === 200) {
                $scope.state.go('hey.timeline');
            } else {
                $scope.showAlert({title: $scope.filter('translate')('ERROR'), content: response.data});
            }
        });
    }

    //
    //
    $scope.selectPic = function() {
        angular.element('form input').click();
    }

    //
    //
    $scope.picValueChanged = function() {
        $scope.showNoticeText('loading...', 1888);
    }

    //
    //
    $scope.picChanged = function() {
        angular.element('form textarea').focus();

        $scope.timeout(function() {
            $ionicScrollDelegate.scrollBottom();
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.show();
                $scope.disableNotice();
            }
        }, 100)
    }
}])


// hey.timeline-detail
.controller('TimelineDetailCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    $scope.TimelineComment = {};

    angular.forEach($scope.timelines, function(value, key) {
        if (value.id = $scope.stateParams.id) {
            $scope.Timeline = value;
        }
    });

    //
    TimelineService.show({id: $scope.stateParams.id}).then(function(response) {
        if (response.status === 200) {
            $scope.Timeline = response.data;
        }
    });

    //
    $scope.commentPublish = function() {
        var params = {
            id: $scope.stateParams.id,
            content: $scope.TimelineComment.content,
        }
        console.debug('### TimelineService.commentPublish params', params);
        TimelineService.commentPublish(params).then(function(response) {
            console.debug('### TimelineService.commentPublish response', response);
            if (response.status == 200) {
                $scope.state.reload();
            }
        });
    }
}])
