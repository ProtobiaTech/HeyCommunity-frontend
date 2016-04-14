HeyCommunity

// tab.user
.controller('UserIndexCtrl', ['$scope', 'UserService', 'NoticeService', '$ionicModal', function($scope, UserService, NoticeService, $ionicModal) {
    if ($scope.stateParams.id) {
        $scope.userInfo = false;
        $scope.isOwnInfo = false;

        UserService.userInfo($scope.stateParams.id).then(function(response) {
            if (response.status === 200) {
                $scope.userInfo = response.data;
            }
        });
    } else {
        $scope.isOwnInfo = true;
    }

    $scope.$root.loadingShowDisabled = true;
    NoticeService.index();


}])



//
.controller('UserTimelineCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    var params = {
        user_id: $scope.stateParams.user_id,
    }
    TimelineService.index(params).then(function(response) {
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
        if (!$scope.utility.please_login_first()) {
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

        $scope.utility.showConfirm(data, function() {
            var params = {
                id: id,
            }
            TimelineService.destroy(params).then(function(response) {
                if (response.status === 200) {
                    angular.forEach($scope.timelines, function(value, key) {
                        if (value.id === params.id) {
                            delete $scope.timelines[key];

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
}])



//
.controller('UserTopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    var params = {
        user_id: $scope.stateParams.user_id,
    }
    TopicService.index(params).then(function(response) {
        if (response.status == 200) {
            $scope.topics = response.data.data;
            $scope.currentPage = response.data.current_page;
        }
    });
}])



// tab.user-signOut
.controller('UserSignOutCtrl', ['$scope', 'UserService', '$ionicHistory', function($scope, UserService, $ionicHistory) {
    UserService.signOut().then(function(response) {
        if (response.status === 200) {
            $ionicHistory.clearCache();
            $scope.state.go('hey.user');
        } else {
            $scope.state.go('hey.user-setup');
        }
    });
}])



// tab.user-info
.controller('UserInfoCtrl', ['$scope', 'UserService', function($scope, UserService) {
    if ($scope.stateParams.id != $scope.$root.userInfo.id) {
        $scope.userInfo = {};
        $scope.isOwnInfo = false;

        UserService.userInfo($scope.stateParams.id).then(function(response) {
            if (response.status === 200) {
                $scope.userInfo = response.data;
            }
        });
    } else {
        $scope.isOwnInfo = true;
    }
}])



// tab.user-info-avatar
.controller('UserInfoAvatarCtrl', ['$scope', 'UserService', '$ionicActionSheet', 'Upload', '$ionicHistory', function($scope, UserService, $ionicActionSheet, Upload, $ionicHistory) {
    $scope.userInfo.newAvatar = false;

    //
    $scope.selectAvatar = function() {
        angular.element('form input').click();
    }

    //
    $scope.submitAvatar = function() {
        var params = {
            avatar: $scope.userInfo.newAvatar,
        }

        console.debug('### UserService.updateAvatar params', params);
        UserService.updateAvatar(Upload, params).then(function(response) {
            console.debug('### UserService.updateAvatar response', response);
            if (response.status == 200) {
                $scope.$root.userInfo = response.data;
                localStorage.userInfo = JSON.stringify(response.data);
                $ionicHistory.clearCache();
                $scope.utility.goBack();
            } else {
                $scope.utility.showAlert({title: $scope.filter('translate')('ERROR'), content: response.data});
            }
        });
    }
}])



// tab.user-setup
.controller('UserSetupCtrl', ['$scope', 'UserService', function($scope, UserService) {
}])


// tab.user-setup-general-language
.controller('UserSetupGeneralLanguageCtrl', ['$scope', 'UserService', '$translate', function($scope, UserService, $translate) {
    $scope.language = localStorage.appLanguage;

    $scope.changeLanguage = function(language) {
        localStorage.appLanguage = language;
        $translate.use(language);
    }
}])



//
.controller('UserNoticeCtrl', ['$scope', 'NoticeService', '$ionicActionSheet', '$ionicListDelegate', '$cordovaBadge', function($scope, NoticeService, $ionicActionSheet, $ionicListDelegate, $cordovaBadge) {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true

    $scope.NoticeService = NoticeService;

    $scope.$root.loadingShowDisabled = true;
    NoticeService.index();

    //
    // load more
    $scope.doRefresh = function() {
        $scope.$root.loadingShowDisabled = true;
        NoticeService.index().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    $scope.showActionSheet = function() {
        var hideSheet = $ionicActionSheet.show({
            destructiveText: $scope.filter('translate')('DESTROY_ALL'),
            titleText: $scope.filter('translate')('MANAGEMENT_OPERATIONS'),
            cancelText: $scope.filter('translate')('CANCEL'),
            buttons: [
                {text: $scope.filter('translate')('MARK_CHECKED_ALL')},
            ],
            cancel: function() {
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    angular.forEach(NoticeService.notices, function(item, $index) {
                        if (item.is_checked != 1) {
                            $scope.check(item, $index);
                        }
                    })
                }
                $scope.timeout(function() { hideSheet(); }, 180);
                // NoticeService.index();
            },
            destructiveButtonClicked: function(index) {
                angular.forEach(NoticeService.notices, function(item, $index) {
                    $scope.destroy(item, $index);
                })
                $scope.timeout(function() { hideSheet(); }, 180);
                // NoticeService.index();
            },
        });

        $scope.timeout(function() {
            hideSheet();
        }, 2000);
    };

    //
    $scope.check = function(item, $index) {
        NoticeService.check($index);
        $ionicListDelegate.closeOptionButtons();
    }

    //
    $scope.destroy = function(item, $index) {
        NoticeService.destroy(item, $index);
        $ionicListDelegate.closeOptionButtons();
    }

    //
    $scope.goState = function(item) {
        if (item.type.name === 'timeline_like' || item.type.name === 'timeline_comment') {
            $scope.state.go('hey.timeline-detail', {timelineId: item.entity_id})
        } else if (item.type.name === 'topic_like' || item.type.name === 'topic_comment') {
            $scope.state.go('hey.topic-detail', {id: item.entity_id})
        }
    }
}])
