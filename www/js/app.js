/* Autor: Luis Bahamonde */

var HeyCommunity = angular.module('starter', [
    'ionic',
    'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix',
])

.run(function($ionicPlatform, $rootScope, SystemService) {
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
    $rootScope.appSiteTitle = 'Hey Communify';
    SystemService.getTenantInfo().then(function(response) {
        if (typeof response.data === 'object') {
            $rootScope.appSiteTitle = response.data.site_name;
            document.title =  response.data.site_name;
            localStorage.tenantInfo = JSON.stringify(response.data);
        }
    });

    $rootScope.getPicUrl = getPicUrl;
})

.config(function($ionicFilterBarConfigProvider, $ionicConfigProvider) {

    $ionicFilterBarConfigProvider.theme('light');
    $ionicFilterBarConfigProvider.clear('ion-close');
    $ionicFilterBarConfigProvider.search('ion-search');
    $ionicFilterBarConfigProvider.backdrop(true);
    $ionicFilterBarConfigProvider.transition('vertical');
    $ionicFilterBarConfigProvider.placeholder('Search...');

    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');


});
