HeyCommunity

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // default url
    $urlRouterProvider.otherwise('/timeline');

    // Hey
    $stateProvider
    .state('hey', {
        url: '',
        abstract: true,
        templateUrl: 'templates/sidemenu.html'
    })



    //
    // Timeline
    // -------------------------------
    .state('hey.timeline', {
        url: '/timeline',
        views: {
            'menuContent': {
                templateUrl: 'templates/timeline/tab-timeline.html',
                controller: 'TimelineCtrl'
            }
        }
    })

    .state('hey.timeline-create', {
        url: '/timeline-create',
        views: {
            'menuContent': {
                templateUrl: 'templates/timeline/timeline-create.html',
                controller: 'TimelineCreateCtrl'
            }
        }
    })

    .state('hey.timeline-detail', {
        url: '/timeline-detail/:timelineId/:id?',
        views: {
            'menuContent': {
                templateUrl: 'templates/timeline/timeline-detail.html',
                controller: 'TimelineDetailCtrl'
            }
        }
    })



    //
    // Activity
    // --------------------------------
    .state('hey.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity/tab-activity.html',
                controller: 'ActivityCtrl'
            }
        }
    })

    .state('hey-activity-detail', {
        url: '/activity-detail/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity/activity-detail.html',
                controller: 'ActivityDetailCtrl'
            }
        }
    })

    .state('hey-activity-create', {
        url: '/activity-create',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity/activity-create.html',
                controller: 'ActivityCreateCtrl'
            }
        }
    })



    //
    // User
    // -------------------------------
    .state('hey.user', {
        url: '/user',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/user/tab-user.html',
                controller: 'UserIndexCtrl'
            }
        }
    })

    .state('hey.user-notice', {
        url: '/user/notice',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-notice.html',
                controller: 'UserNoticeCtrl'
            }
        }
    })

    .state('hey.user-timeline', {
        url: '/user/timeline/:user_id',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-timeline.html',
                controller: 'UserTimelineCtrl'
            }
        }
    })

    .state('hey.user-topic', {
        url: '/user/topic/:user_id',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-topic.html',
                controller: 'UserTopicCtrl'
            }
        }
    })

    .state('hey.user-info', {
        url: '/user/user-info/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-info.html',
                controller: 'UserInfoCtrl'
            }
        }
    })

    .state('hey.user-home', {
        url: '/user/home/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-home.html',
                controller: 'UserHomeCtrl'
            }
        }
    })

    .state('hey.user-info-avatar', {
        url: '/user/user-info-avatar',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-info-avatar.html',
                controller: 'UserInfoAvatarCtrl'
            }
        }
    })

    .state('hey.user-infoEdit', {
        url: '/user/user-infoEdit',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-infoEdit.html',
                controller: 'UserInfoEditCtrl'
            }
        }
    })

    .state('hey.user-setup', {
        url: '/user/user-setup',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup.html',
                controller: 'UserSetupCtrl'
            }
        }
    })

    .state('hey.user-setup-accountSecurity', {
        url: '/user/user-setup-accountSecurity',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup-accountSecurity.html',
                controller: 'AccountSecurityCtrl'
            }
        }
    })

    .state('hey.user-setup-privacy', {
        url: '/user/user-setup-privacy',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup-privacy.html',
            }
        }
    })

    .state('hey.user-setup-feedback', {
        url: '/user/user-setup-feedback',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup-feedback.html',
            }
        }
    })

    .state('hey.user-setup-softInfo', {
        url: '/user/user-setup-softInfo',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup-softInfo.html',
            }
        }
    })

    .state('hey.user-setup-general', {
        url: '/user/user-setup-general',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup-general.html',
            }
        }
    })

    .state('hey.user-setup-general-language', {
        url: '/user/user-setup-general-language',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-setup-general-language.html',
                controller: 'UserSetupGeneralLanguageCtrl'
            }
        }
    })



    //
    // Topic
    // -------------------------------
    .state('hey.topic', {
        url: '/topic',
        views: {
            'menuContent': {
                templateUrl: 'templates/topic/tab-topic.html',
                controller: 'TopicCtrl'
            }
        }
    })

    .state('hey.topic-detail', {
        url: '/topic-detail/:topicId/:id?',
        views: {
            'menuContent': {
                templateUrl: 'templates/topic/topic-detail.html',
                controller: 'TopicDetailCtrl'
            }
        }
    })

    .state('hey.topic-create', {
        url: '/topic-create',
        views: {
            'menuContent': {
                templateUrl: 'templates/topic/topic-create.html',
                controller: 'TopicCreateCtrl'
            }
        }
    })



    //
    // Talk
    // -------------------------------
    .state('hey.talk', {
        url: '/talk',
        views: {
            'menuContent': {
                templateUrl: 'templates/talk/tab-talk.html',
                controller: 'TalkCtrl'
            }
        }
    })

    .state('hey.talk-ing', {
        url: '/talk/ing',
        views: {
            'menuContent': {
                templateUrl: 'templates/talk/tab-talk-ing.html',
                controller: 'TalkIngCtrl'
            }
        }
    })



    //
    // Single
    // -------------------------------
    .state('hey-deving', {
        url: '/deving',
        views: {
            'menuContent': {
                templateUrl: 'templates/single/deving.html',
                controller: 'SingleDevingCtrl',
            }
        }
    })
}]);
