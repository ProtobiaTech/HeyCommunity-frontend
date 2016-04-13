/* Autor: Luis Bahamonde */

var HeyCommunity = angular.module('starter', [
    'ionic', 'ngCordova',
    'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix',
    'pascalprecht.translate', 'ngFileUpload', 'ngImgCrop',
])


.run([
    '$ionicPlatform', '$rootScope', '$state', '$stateParams', 'UtilityService', 'SystemService', 'UserService', '$ionicLoading', '$ionicHistory', '$filter', '$timeout',
    function($ionicPlatform, $rootScope, $state, $stateParams, UtilityService, SystemService, UserService, $ionicLoading, $ionicHistory, $filter, $timeout) {
        //
        // platform ready
        $ionicPlatform.ready(function($rootScope) {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                // cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                //StatusBar.styleDefault();
                StatusBar.styleLightContent();

                // statusTap scroll to top
                window.addEventListener("statusTap", function() {
                    $ionicScrollDelegate.scrollTop(true);
                });
            }
        });


        //
        // the utility service
        $rootScope.utility = UtilityService;


        //
        // Set TenantInfo
        $rootScope.appSiteTitle = 'Hey Community';
        SystemService.getTenantInfo().then(function(response) {
            if (typeof response.data === 'object') {
                $rootScope.appSiteTitle = response.data.site_name;
                document.title =  response.data.site_name;
                localStorage.tenantInfo = JSON.stringify(response.data);
            }
        });


        //
        // user
        UserService.userInfo().then(function(response) {
            if (response.status === 200) {
                $rootScope.userInfo = response.data;
            }
        });


        //
        // functions
        $rootScope.getPicUrl = getPicUrl;
        $rootScope.getApiUrl = getApiUrl;
        $rootScope.getMomentDate = getMomentDate;

        $rootScope.state = $state;
        $rootScope.filter = $filter;
        $rootScope.timeout = $timeout;
        $rootScope.stateParams = $stateParams;
        $rootScope.ionicHistory = $ionicHistory;
        $rootScope.userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {};
        $rootScope.badgeNum = 0;


        //
        // loading state
        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({template: '<ion-spinner></ion-spinner>'})
        })
        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide()
        })
        $rootScope.$on('notice:show', function(event, text) {
            $ionicLoading.show({template: text})
        })
        $rootScope.$on('notice:hide', function() {
            $ionicLoading.hide()
        })
    }
])


.config(['$ionicFilterBarConfigProvider', '$ionicConfigProvider', '$httpProvider', '$translateProvider', function($ionicFilterBarConfigProvider, $ionicConfigProvider, $httpProvider, $translateProvider) {
    //
    // set language
    if (!localStorage.appLanguage) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('zh-cn');
        localStorage.appLanguage = 'zh-cn';
    } else {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage(localStorage.appLanguage);
    }

    //
    // filterBar config
    $ionicFilterBarConfigProvider.theme('light');
    $ionicFilterBarConfigProvider.clear('ion-close');
    $ionicFilterBarConfigProvider.search('ion-search');
    $ionicFilterBarConfigProvider.backdrop(true);
    $ionicFilterBarConfigProvider.transition('vertical');
    $ionicFilterBarConfigProvider.placeholder('Search...');


    //
    // backButton config
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');


    //
    // navbar config
    $ionicConfigProvider.navBar.alignTitle('center');   // Places them at the bottom for all OS


    //
    // tabs config
    $ionicConfigProvider.tabs.position('bottom');   // Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style('standard');    // Makes them all look the same across all OS

    //
    // http provider config
    $httpProvider.defaults.headers.common.domain = API;
    $httpProvider.interceptors.push(['$rootScope', function($rootScope) {
        return {
            request: function(config) {
                if ($rootScope.loadingShowDisabled) {
                    $rootScope.loadingShowDisabled = false;
                } else {
                    $rootScope.$broadcast('loading:show');
                }
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
    }])
}])
