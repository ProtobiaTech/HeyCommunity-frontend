HeyCommunity

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // default url
    $urlRouterProvider.otherwise('/timeline');

    // Hey
    $stateProvider
    .state('hey', {
        url: '',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })



    //
    // Timeline
    // -------------------------------
    .state('hey.timeline', {
        url: '/timeline',
        views: {
            'tab-timeline': {
                templateUrl: 'templates/timeline/tab-timeline.html',
                controller: 'TimelineCtrl'
            }
        }
    })

    .state('hey-timeline-create', {
        url: '/timeline-create',
        templateUrl: 'templates/timeline/timeline-create.html',
        controller: 'TimelineCreateCtrl'
    })

    .state('hey-timeline-detail', {
        url: '/timeline-detail/:id',
        templateUrl: 'templates/timeline/timeline-detail.html',
        controller: 'TimelineDetailCtrl'
    })



    //
    // Activity
    // --------------------------------
    .state('hey.activity', {
        url: '/activity',
        views: {
            'tab-activity': {
                templateUrl: 'templates/activity/tab-activity.html',
                controller: 'ActivityCtrl'
            }
        }
    })

    .state('hey-activity-detail', {
        url: '/activity-detail/:id',
        templateUrl: 'templates/activity/activity-detail.html',
        controller: 'ActivityDetailCtrl'
    })

    .state('hey-activity-create', {
        url: '/activity-create',
        templateUrl: 'templates/activity/activity-create.html',
        controller: 'ActivityCreateCtrl'
    })



    //
    // User
    // -------------------------------
    .state('hey.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'templates/user/tab-user.html',
                controller: 'UserIndexCtrl'
            }
        }
    })

    .state('hey-user-notice', {
        url: '/user/notice',
        templateUrl: 'templates/user/user-notice.html',
        controller: 'UserNoticeCtrl'
    })

    .state('hey-user-timeline', {
        url: '/user/timeline',
        templateUrl: 'templates/user/user-timeline.html',
        controller: 'UserTimelineCtrl'
    })

    .state('hey-user-topic', {
        url: '/user/topic',
        templateUrl: 'templates/user/user-topic.html',
        controller: 'UserTopicCtrl'
    })

    .state('hey-user-signIn', {
        url: '/user/signIn',
        templateUrl: 'templates/user/user-signIn.html',
        controller: 'UserSignInCtrl'
    })

    .state('hey-user-signUp', {
        url: '/user/signUp',
        templateUrl: 'templates/user/user-signUp.html',
        controller: 'UserSignUpCtrl'
    })

    .state('hey-user-signOut', {
        cache: false,
        url: '/user/signOut',
        controller: 'UserSignOutCtrl'
    })

    .state('hey-user-info', {
        url: '/user/user-info/:id',
        templateUrl: 'templates/user/user-info.html',
        controller: 'UserInfoCtrl'
    })

    .state('hey-uhome', {
        url: '/uhome/:id',
        templateUrl: 'templates/user/tab-user.html',
        controller: 'UserIndexCtrl'
    })

    .state('hey-user-info-avatar', {
        url: '/user/user-info-avatar',
        templateUrl: 'templates/user/user-info-avatar.html',
        controller: 'UserInfoAvatarCtrl'
    })

    .state('hey-user-infoEdit', {
        url: '/user/user-infoEdit',
        templateUrl: 'templates/user/user-infoEdit.html',
        controller: 'UserInfoEditCtrl'
    })

    .state('hey-user-setup', {
        url: '/user/user-setup',
        templateUrl: 'templates/user/user-setup.html',
        controller: 'UserSetupCtrl'
    })

    .state('hey-user-setup-accountSecurity', {
        url: '/user/user-setup-accountSecurity',
        templateUrl: 'templates/user/user-setup-accountSecurity.html',
    })

    .state('hey-user-setup-privacy', {
        url: '/user/user-setup-privacy',
        templateUrl: 'templates/user/user-setup-privacy.html',
    })

    .state('hey-user-setup-feedback', {
        url: '/user/user-setup-feedback',
        templateUrl: 'templates/user/user-setup-feedback.html',
    })

    .state('hey-user-setup-softInfo', {
        url: '/user/user-setup-softInfo',
        templateUrl: 'templates/user/user-setup-softInfo.html',
    })

    .state('hey-user-setup-general', {
        url: '/user/user-setup-general',
        templateUrl: 'templates/user/user-setup-general.html',
        // controller: 'UserSetupGeneralCtrl'
    })

    .state('hey-user-setup-general-language', {
        url: '/user/user-setup-general-language',
        templateUrl: 'templates/user/user-setup-general-language.html',
        controller: 'UserSetupGeneralLanguageCtrl'
    })



    //
    // Topic
    // -------------------------------
    .state('hey.topic', {
        url: '/topic',
        views: {
            'tab-topic': {
                templateUrl: 'templates/topic/tab-topic.html',
                controller: 'TopicCtrl'
            }
        }
    })

    .state('hey-topic-detail', {
        url: '/topic-detail/:id',
        templateUrl: 'templates/topic/topic-detail.html',
        controller: 'TopicDetailCtrl'
    })

    .state('hey-topic-create', {
        url: '/topic-create',
        templateUrl: 'templates/topic/topic-create.html',
        controller: 'TopicCreateCtrl'
    })



    //
    // Talk
    // -------------------------------
    .state('hey.talk', {
        url: '/talk',
        views: {
            'tab-talk': {
                templateUrl: 'templates/talk/tab-talk.html',
                controller: 'TalkCtrl'
            }
        }
    })

    .state('hey.talk-ing', {
        url: '/talk/ing',
        views: {
            'tab-talk': {
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
        templateUrl: 'templates/single/deving.html',
        controller: 'SingleDevingCtrl',
    })
}]);
