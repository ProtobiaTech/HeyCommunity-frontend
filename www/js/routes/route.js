HeyCommunity

.config(function($stateProvider, $urlRouterProvider) {

  // default url
  $urlRouterProvider.otherwise('/timeline');

  $stateProvider
  .state('hey', {
    url: '',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // deving
  .state('hey.deving', {
    url: '/deving',
    views: {
      'tab-deving': {
        templateUrl: 'templates/tab-deving.html',
      }
    }
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
        templateUrl: 'templates/tab-timeline.html',
        controller: 'TimelineCtrl'
      }
    }
  })

  // activity
  .state('hey.activity', {
    url: '/activity',
    views: {
      'tab-activity': {
        templateUrl: 'templates/tab-activity.html',
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

  .state('hey.user-signOut', {
    url: '/user/signOut',
    views: {
      'tab-user': {
        controller: 'UserSignOutCtrl'
      }
    }
  })

  .state('hey.user-signIn', {
    url: '/user/signIn',
    views: {
      'tab-user': {
        templateUrl: 'templates/user/tab-user-signIn.html',
        controller: 'UserSignInCtrl'
      }
    }
  })

  .state('hey.user-signUp', {
    url: '/user/signUp',
    views: {
      'tab-user': {
        templateUrl: 'templates/user/tab-user-signUp.html',
        controller: 'UserSignUpCtrl'
      }
    }
  })

  .state('hey.user-info', {
    url: '/user/user-info',
    views: {
      'tab-user': {
        templateUrl: 'templates/user/tab-user-info.html',
        controller: 'UserInfoCtrl'
      }
    }
  })

  .state('hey.user-infoEdit', {
    url: '/user/user-infoEdit',
    views: {
      'tab-user': {
        templateUrl: 'templates/user/tab-user-infoEdit.html',
        controller: 'UserInfoEditCtrl'
      }
    }
  })

  .state('hey.user-setup', {
    url: '/user/user-setup',
    views: {
      'tab-user': {
        templateUrl: 'templates/user/tab-user-setup.html',
        controller: 'UserSetupCtrl'
      }
    }
  })



  // topic
  .state('hey.topic', {
    url: '/topic',
    views: {
      'tab-topic': {
        templateUrl: 'templates/topic/tab-topic.html',
        // controller: 'TopicController'
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

  .state('hey.topic-detail', {
    url: '/topic-detail',
    views: {
      'tab-topic': {
        templateUrl: 'templates/topic/tab-topic-detail.html',
        // controller: 'TopicController'
      }
    }
  })

  .state('hey.topic-reply', {
    url: '/topic-reply',
    views: {
      'tab-topic': {
        templateUrl: 'templates/topic/tab-topic-reply.html',
        // controller: 'TopicController'
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

});
