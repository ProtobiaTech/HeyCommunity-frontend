HeyCommunity.config(function($stateProvider, $urlRouterProvider) {

  // default url
  $urlRouterProvider.otherwise('/tab/timeline');

  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // deving
  .state('tab.deving', {
    url: '/deving',
    views: {
      'tab-deving': {
        templateUrl: 'templates/tab-deving.html',
      }
    }
  })

  // plus
  .state('tab.plus', {
    url: '/plus',
    views: {
      'tab-plus': {
        templateUrl: 'templates/tab-plus.html',
        controller: 'PlusCtrl'
      }
    }
  })

  // timeline
  .state('tab.timeline', {
    url: '/timeline',
    views: {
      'tab-timeline': {
        templateUrl: 'templates/tab-timeline.html',
        controller: 'TimelineCtrl'
      }
    }
  })

  // activity
  .state('tab.activity', {
    url: '/activity',
    views: {
      'tab-activity': {
        templateUrl: 'templates/tab-activity.html',
        controller: 'ActivityCtrl'
      }
    }
  })

  // group
  .state('tab.group', {
    url: '/group',
    views: {
      'tab-group': {
        templateUrl: 'templates/tab-group.html',
        controller: 'GroupController'
      }
    }
  })




  // @mark delete
  .state('tab.fotos-detail', {
    url: '/fotos/:fotosId',
    views: {
      'tab-fotos': {
        templateUrl: 'templates/fotos-detail.html',
        controller: 'AlbunesController'
      }
    }
  })
  .state('tab.favoritos', {
      url: '/favoritos',
      views: {
          'tab-favoritos': {
              templateUrl: 'templates/tab-love.html',
              controller: 'FavoritosController'
          }
      }
  })
  .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AjustesController'
            }
        }
  });

});
