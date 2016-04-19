HeyCommunity

// tab.user
.controller('UserIndexCtrl', ['$scope', 'UserService', 'NoticeService', '$ionicModal', function($scope, UserService, NoticeService, $ionicModal) {
    $scope.$root.loadingShowDisabled = true;
    NoticeService.index();
}])


//
//
.controller('UserHomeCtrl', ['$scope', 'UserService', 'NoticeService', '$ionicModal', function($scope, UserService, NoticeService, $ionicModal) {
    $scope.userInfo = false;

    UserService.userInfo($scope.stateParams.id).then(function(response) {
        if (response.status === 200) {
            $scope.userInfo = response.data;
        }
    });
}])


//
.controller('UserTimelineCtrl', ['$scope', 'TimelineService', function($scope, TimelineService) {
    $scope.TimelineService = TimelineService;
    $scope.timelineFilter = {
        user_id: parseInt($scope.stateParams.user_id),
    }
    $scope.timelineFilterStrict = true;

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
        return inArray(id, $scope.TimelineService.timelineLikes);
    }
}])



//
.controller('UserTopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    $scope.TopicService = TopicService;
    $scope.topicFilter = {
        user_id: parseInt($scope.stateParams.user_id),
    }
    $scope.topicFilterStrict = true;
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
                            NoticeService.check($index);
                        }
                    })
                }
                hideSheet();
                // NoticeService.index();
            },
            destructiveButtonClicked: function(index) {
                angular.forEach(NoticeService.notices, function(item, $index) {
                    NoticeService.destroy(item, $index);
                })
                hideSheet();
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
            $scope.state.go('hey.topic-detail', {topicId: item.entity_id})
        }
    }
}])
