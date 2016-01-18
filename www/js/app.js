/* Autor: Luis Bahamonde */

var HeyCommunity = angular.module('starter', [
    'ionic',
    'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix',
    'pascalprecht.translate',
])

.run(function($ionicPlatform, $rootScope, $state, SystemService, $ionicLoading) {
    $ionicPlatform.ready(function() {
        /* @mark what doing
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 2000);
        */

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            //StatusBar.styleDefault();
            StatusBar.styleLightContent();
        }
    });

    // Set TenantInfo
    $rootScope.appSiteTitle = 'Hey Community';
    SystemService.getTenantInfo().then(function(response) {
        if (typeof response.data === 'object') {
            $rootScope.appSiteTitle = response.data.site_name;
            document.title =  response.data.site_name;
            localStorage.tenantInfo = JSON.stringify(response.data);
        }
    });

    // get pic url
    $rootScope.getPicUrl = getPicUrl;

    $rootScope.state = $state;

    $rootScope.isAuth = function() {
        if (localStorage.user) {
            return true;
        } else {
            return false;
        }
    }

    // loading state
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template: '<ion-spinner></ion-spinner>'})
    })
    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    })
})

.config(function($ionicFilterBarConfigProvider, $ionicConfigProvider, $httpProvider, $translateProvider) {
    $translateProvider.preferredLanguage('en');

    $ionicFilterBarConfigProvider.theme('light');
    $ionicFilterBarConfigProvider.clear('ion-close');
    $ionicFilterBarConfigProvider.search('ion-search');
    $ionicFilterBarConfigProvider.backdrop(true);
    $ionicFilterBarConfigProvider.transition('vertical');
    $ionicFilterBarConfigProvider.placeholder('Search...');

    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');

    $ionicConfigProvider.navBar.alignTitle('center');   // Places them at the bottom for all OS
    $ionicConfigProvider.tabs.position('bottom');   // Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style('standard');    // Makes them all look the same across all OS

    // http provider config
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config;
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            },
            requestError: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            },
            responseError: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            }
        }
    })
});
