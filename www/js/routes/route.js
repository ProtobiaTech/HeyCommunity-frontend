HeyCommunity

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // default url
  $urlRouterProvider.otherwise('/timeline');

  $stateProvider
  .state('hey', {
    url: '',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // plus
  .state('hey.plus', {
    url: '/plus',
    views: {
      'tab-plus': {
        templateUrl: 'templates/tab-plus.html',
        controller: 'PlusCtrl'
      }
    }
  })

  // timeline
  .state('hey.timeline', {
    url: '/timeline',
    views: {
      'tab-timeline': {
        templateUrl: 'templates/timeline/tab-timeline.html',
        controller: 'TimelineCtrl'
      }
    }
  })

  // activity
  .state('hey.activity', {
    url: '/activity',
    views: {
      'tab-activity': {
        templateUrl: 'templates/activity/tab-activity.html',
        controller: 'ActivityCtrl'
      }
    }
  })


  // user
  .state('hey.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/user/tab-user.html',
        controller: 'UserIndexCtrl'
      }
    }
  })


  // topic
  .state('hey.topic', {
    url: '/topic',
    views: {
      'tab-topic': {
        templateUrl: 'templates/topic/tab-topic.html',
        controller: 'TopicCtrl'
      }
    }
  })

  .state('hey.topic-new', {
    url: '/topic-new',
    views: {
      'tab-topic': {
        // templateUrl: 'templates/tab-reply.html',
        // controller: 'TopicController'
      }
    }
  })

  .state('hey.topic-edit', {
    url: '/topic-edit',
    views: {
      'tab-topic': {
        // templateUrl: 'templates/tab-reply.html',
        // controller: 'TopicController'
      }
    }
  })



  // talk
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



  // group
  .state('hey.group', {
    url: '/group',
    views: {
      'tab-group': {
        templateUrl: 'templates/tab-group.html',
        controller: 'GroupController'
      }
    }
  })




  // @mark delete
  .state('hey.fotos-detail', {
    url: '/fotos/:fotosId',
    views: {
      'tab-fotos': {
        templateUrl: 'templates/fotos-detail.html',
        controller: 'AlbunesController'
      }
    }
  })
  .state('hey.favoritos', {
      url: '/favoritos',
      views: {
          'tab-favoritos': {
              templateUrl: 'templates/tab-love.html',
              controller: 'FavoritosController'
          }
      }
  })
  .state('hey.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AjustesController'
            }
        }
  });




    //
    // User signIn
    // -------------------------------
    $stateProvider
    .state('hey-user-signIn', {
        url: '/user/signIn',
        templateUrl: 'templates/user/user-signIn.html',
        controller: 'UserSignInCtrl'
    })

    // user signUp
    .state('hey-user-signUp', {
        url: '/user/signUp',
        templateUrl: 'templates/user/user-signUp.html',
        controller: 'UserSignUpCtrl'
    })

    // user signOut
    .state('hey-user-signOut', {
        url: '/user/signOut',
        controller: 'UserSignOutCtrl'
    })

    // user info
    .state('hey-user-info', {
        url: '/user/user-info',
        templateUrl: 'templates/user/user-info.html',
        controller: 'UserInfoCtrl'
    })

    // user infoEdit
    .state('hey-user-infoEdit', {
        url: '/user/user-infoEdit',
        templateUrl: 'templates/user/user-infoEdit.html',
        controller: 'UserInfoEditCtrl'
    })

    // user setup
    .state('hey-user-setup', {
        url: '/user/user-setup',
        templateUrl: 'templates/user/user-setup.html',
        controller: 'UserSetupCtrl'
    })

    // user setup general
    .state('hey-user-setup-general', {
        url: '/user/user-setup-general',
        templateUrl: 'templates/user/user-setup-general.html',
        // controller: 'UserSetupGeneralCtrl'
    })

    // user setup general language
    .state('hey-user-setup-general-language', {
        url: '/user/user-setup-general-language',
        templateUrl: 'templates/user/user-setup-general-language.html',
        controller: 'UserSetupGeneralLanguageCtrl'
    })



    //
    // Timeline create
    // -------------------------------
    $stateProvider
    .state('hey-timeline-create', {
        url: '/timeline-create',
        templateUrl: 'templates/timeline/tab-timeline-create.html',
        controller: 'TimelineCreateCtrl'
    })



    //
    // Topic detail
    // -------------------------------
    $stateProvider
    .state('hey-topic-detail', {
        url: '/topic-detail/:id',
        templateUrl: 'templates/topic/tab-topic-detail.html',
        controller: 'TopicDetailCtrl'
    })

    // Topic create
    .state('hey-topic-create', {
        url: '/topic-create',
        templateUrl: 'templates/topic/topic-create.html',
        controller: 'TopicCreateCtrl'
    })



    //
    // Activity detail
    // -------------------------------
    $stateProvider
    .state('hey-activity-detail', {
        url: '/activity-detail/:id',
        templateUrl: 'templates/activity/tab-activity-detail.html',
        controller: 'ActivityDetailCtrl'
    })

    // Activity create
    .state('hey-activity-create', {
        url: '/activity-create',
        templateUrl: 'templates/activity/tab-activity-create.html',
        controller: 'ActivityCreateCtrl'
    })



    //
    // Other hey-deving
    // -------------------------------
    $stateProvider
    .state('hey-deving', {
        url: '/deving',
        templateUrl: 'templates/single/deving.html',
        controller: 'SingleDevingCtrl',
    });
}]);
