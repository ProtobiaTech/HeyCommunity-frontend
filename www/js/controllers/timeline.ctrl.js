HeyCommunity

// hey.timeline
.controller('TimelineCtrl', ['$scope', 'TimelineService', '$ionicActionSheet', function($scope, TimelineService, $ionicActionSheet) {
    $scope.$root.loadingShowDisabled = true;
    TimelineService.index().then(function(response) {
        if (response.status == 200) {
            $scope.$root.timelines = response.data.timelines;
            $scope.$root.timelineLikes = response.data.likes;
        }
    });

    //
    //
    $scope.getInteractionUsers = function(timeline) {
        var str = '';
        if (timeline.like_num > 0) {
            timeline.author_like.forEach(function(author_like, $index) {
                if ($index < 4) {
                    str = str + author_like.author.nickname + ', ';
                }
            })
            str = str.substring(0, str.length - 2);
        } else {
            str += timeline.author.nickname;
        }
        return str;
    }

    //
    //
    $scope.getInteractionNum = function(timeline, text) {
        var num = parseInt(timeline.like_num) + parseInt(timeline.comment_num);
        num = num ? num : 1;
        return $scope.filter('translate')(text, {num: num})
    }

    //
    // is Like
    $scope.isLike = function(id) {
        return inArray(id, $scope.$root.timelineLikes);
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
        if (!$scope.utility.please_login_first()) {
            var params = {
                id: id,
            }
            console.debug('### TimelineService.like params', params);
            TimelineService.like(params).then(function(response) {
                console.debug('### TimelineService.like response', response);
                if (response.status == 200) {
                    angular.forEach($scope.$root.timelines, function(v, index) {
                        if (id == v.id) {
                            // if (v.like_num > response.data.like_num) {
                            if ($scope.isLike(id)) {
                                var i = $scope.$root.timelineLikes.indexOf(response.data.id);
                                $scope.$root.timelineLikes.splice(i, 1);
                            } else {
                                $scope.$root.timelineLikes.push(response.data.id);
                            }
                            $scope.$root.timelines[index] = response.data;
                        }
                    })
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

        $scope.utility.showConfirm(data, function() {
            var params = {
                id: id,
            }
            TimelineService.destroy(params).then(function(response) {
                if (response.status === 200) {
                    angular.forEach($scope.$root.timelines, function(value, key) {
                        if (value.id === params.id) {
                            delete $scope.$root.timelines.splice(key, 1);

                            $scope.utility.showNoticeSuccess();
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

        var params = {
            type:   'refresh',
            id:     $scope.$root.timelines[0].id,
        }
        console.debug('### TimelineService.doRefresh params', params);
        TimelineService.index(params).then(function(response) {
            console.debug('### TimelineService.doRefresh response', response);
            if (response.status == 200) {
                while (response.data.timelines.length > 0) {
                    $scope.$root.timelines.unshift(response.data.timelines.shift());
                }
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
            type:   'infinite',
            id:     $scope.$root.timelines[$scope.$root.timelines.length - 1].id,
        }
        console.debug('### TimelineService.loadMore params', params);
        TimelineService.index(params).then(function(response) {
            console.debug('### TimelineService.loadMore response', response);
            if (response.status == 200) {
                if (typeof response.data.timelines !== 'undefined' && response.data.timelines.length > 0) {
                    $scope.$root.timelines = $scope.$root.timelines.concat(response.data.timelines);
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
                // {text: $scope.filter('translate')('NEW_VIDEO')},
            ],
            cancelText: $scope.filter('translate')('CANCEL'),
            cancel: function() {
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    $scope.state.go('hey.timeline-create');
                } else if (index === 1) {
                     $scope.utility.showNoticeText('COMING_SOON');
                }
            }
        });

        $scope.timeout(function() {
            hideSheet();
        }, 5000);
    };
}])


// hey.timeline-create
.controller('TimelineCreateCtrl', ['$scope', 'TimelineService', 'Upload', '$ionicScrollDelegate', function($scope, TimelineService, Upload, $ionicScrollDelegate) {
    $scope.Timeline = {};

    $scope.store = function() {
        if ($scope.Timeline.pic && $scope.Timeline.content) {
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
                    $scope.utility.showAlert({title: $scope.filter('translate')('ERROR'), content: response.data});
                }
            });
        } else {
            return false;
        }
    }

    //
    //
    $scope.selectPic = function() {
        angular.element('form input').click();
    }

    //
    //
    $scope.picValueChanged = function() {
        $scope.utility.showNoticeText('loading...', 1888);
    }

    //
    //
    $scope.picChanged = function() {
        angular.element('form textarea').focus();

        $scope.timeout(function() {
            $ionicScrollDelegate.scrollBottom();
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.show();
                $scope.utility.disableNotice();
            }
        }, 100)
    }
}])


// hey.timeline-detail
.controller('TimelineDetailCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    var timelineIndex = $scope.stateParams.id;
    var timelineId = $scope.stateParams.timelineId;
    $scope.Timeline = {};

    $scope.TimelineComment = {};
    if ($scope.$root.timelines !== undefined) {
        $scope.Timeline = $scope.$root.timelines[timelineIndex];
    }

    //
    $scope.$root.loadingShowDisabled = true;
    TimelineService.show({id: timelineId}).then(function(response) {
        if (response.status === 200) {
            $scope.Timeline = response.data;
        }
    });

    //
    // is Like
    $scope.isLike = function(id) {
        if ($scope.$root.timelineLikes !== undefined) {
            return inArray(id, $scope.$root.timelineLikes);
        } else {
            return false;
        }
    }

    //
    // like
    $scope.like = function(id, isDoubleTap) {
        $scope.$root.loadingShowDisabled = true;
        if (!$scope.utility.please_login_first()) {
            var params = {
                id: id,
            }
            console.debug('### TimelineService.like params', params);
            TimelineService.like(params).then(function(response) {
                console.debug('### TimelineService.like response', response);
                if (response.status == 200) {
                    if ($scope.$root.timelines !== undefined) {
                        $scope.$root.timelines[timelineIndex] = response.data;
                        $scope.Timeline = response.data;

                        if ($scope.isLike(id)) {
                            var i = $scope.$root.timelineLikes.indexOf(response.data.id);
                            $scope.$root.timelineLikes.splice(i, 1);
                        } else {
                            $scope.$root.timelineLikes.push(response.data.id);
                        }
                    }
                }
            })
        }
    }

    //
    $scope.commentPublish = function() {
        var params = {
            id: $scope.stateParams.timelineId,
            content: $scope.TimelineComment.content,
        }
        console.debug('### TimelineService.commentPublish params', params);
        TimelineService.commentPublish(params).then(function(response) {
            console.debug('### TimelineService.commentPublish response', response);
            if (response.status == 200) {
                $scope.TimelineComment.content = '';
                $scope.Timeline = response.data;
                if ($scope.$root.timelines !== undefined) {
                    $scope.$root.timelines[timelineIndex] = response.data;
                }
            }
        });
    }
}])
