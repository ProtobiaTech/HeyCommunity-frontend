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

    $stateProvider
    .state('hey-timeline-create', {
        url: '/timeline-create',
        templateUrl: 'templates/timeline/timeline-create.html',
        controller: 'TimelineCreateCtrl'
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

    $stateProvider
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

    $stateProvider
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
        url: '/user/user-info',
        templateUrl: 'templates/user/user-info.html',
        controller: 'UserInfoCtrl'
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

    $stateProvider
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
    // Other
    // -------------------------------
    $stateProvider
    .state('hey-deving', {
        url: '/deving',
        templateUrl: 'templates/single/deving.html',
        controller: 'SingleDevingCtrl',
    });
}]);
