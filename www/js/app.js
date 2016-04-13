/* Autor: Luis Bahamonde */

var HeyCommunity = angular.module('starter', [
    'ionic', 'ngCordova',
    'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix',
    'pascalprecht.translate', 'ngFileUpload', 'ngImgCrop',
])


.run(['$ionicPlatform', '$rootScope', '$state', '$stateParams', '$ionicScrollDelegate', 'UtilityService', 'SystemService', '$ionicLoading', '$ionicHistory', 'UserService', '$ionicPopup', '$translate', '$filter', '$timeout', '$cordovaBadge', '$http', '$cordovaDialogs',
    function($ionicPlatform, $rootScope, $state, $stateParams, $ionicScrollDelegate, UtilityService, SystemService, $ionicLoading, $ionicHistory, UserService, $ionicPopup, $translate, $filter, $timeout, $cordovaBadge, $http, $cordovaDialogs) {
    $ionicPlatform.ready(function($rootScope) {
        /* @mark what doing
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 2000);
        */

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            //StatusBar.styleDefault();
            StatusBar.styleLightContent();

            window.addEventListener("statusTap", function() {
                $ionicScrollDelegate.scrollTop(true);
            });
        }
    });

    $rootScope.utility = UtilityService;

    // Set TenantInfo
    $rootScope.appSiteTitle = 'Hey Community';
    SystemService.getTenantInfo().then(function(response) {
        if (typeof response.data === 'object') {
            $rootScope.appSiteTitle = response.data.site_name;
            document.title =  response.data.site_name;
            localStorage.tenantInfo = JSON.stringify(response.data);
        }
    });

    $rootScope.tabActive = function(tabName) {
        var stateName = 'hey.' + tabName;
        return $state.includes(stateName);
    }

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

    $rootScope.goBack = function(state) {
        if ($ionicHistory.backView() === null) {
            if (state === undefined) {
                $rootScope.state.go('hey.timeline')
            } else {
                $rootScope.state.go(state)
            }
        } else {
            $ionicHistory.goBack();
        }
    }




    // user
    UserService.userInfo().then(function(response) {
        if (response.status === 200) {
            $rootScope.userInfo = response.data;
        }
    });
    $rootScope.isAuth = function() {
        if (localStorage.user) {
            return true;
        } else {
            return false;
        }
    }
    $rootScope.isAdmin = function() {
        if ($rootScope.userInfo.id <= 4) {
            return true;
        } else {
            return false;
        }
    }

    $rootScope.please_login_first = function() {
        if (!$rootScope.isAuth()) {
            $rootScope.$broadcast('notice:show', $filter('translate')('PLEASE_LOGIN_FIRST'));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, 1288);
            return true;
        } else {
            return false;
        }
    }



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
}])


.config(['$ionicFilterBarConfigProvider', '$ionicConfigProvider', '$httpProvider', '$translateProvider', function($ionicFilterBarConfigProvider, $ionicConfigProvider, $httpProvider, $translateProvider) {
    if (!localStorage.appLanguage) {
        /* default language
        if (navigator.language) {
            $translateProvider.preferredLanguage(navigator.language);
            localStorage.appLanguage = navigator.language;
        } else {
            $translateProvider.preferredLanguage('zh-cn');
            localStorage.appLanguage = 'zh-cn';
        }
        */
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('zh-cn');
        localStorage.appLanguage = 'zh-cn';
    } else {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage(localStorage.appLanguage);
    }

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
