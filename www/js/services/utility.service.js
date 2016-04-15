HeyCommunity

.service('UtilityService', [
    '$cordovaBadge', '$cordovaDialogs', '$rootScope', '$filter', '$state', '$ionicHistory', '$timeout', '$cordovaInAppBrowser', 'NoticeService',
    function($cordovaBadge, $cordovaDialogs, $rootScope, $filter, $state, $ionicHistory, $timeout, $cordovaInAppBrowser, NoticeService) {

        var self = this;

        //
        // service run
        self.serviceRun = function() {
            $timeout(function() {
                NoticeService.serviceRun();
            }, 888)
        }

        //
        // Set badge num
        self.setBadgeNum = function(badgeNum) {
            if (window.cordova) {
                $cordovaBadge.hasPermission().then(function(yes) {
                    $cordovaBadge.set($rootScope.badgeNum).then(function() {
                        // self.showNoticeText('show badge ' + badgeNum);
                    }, function(err) {
                        self.showNoticeText('show badge error');
                    });
                }, function(no) {
                    self.showNoticeText(no);
                });
            } else {
                 return false;
            }
        }



        //
        // tab active
        self.tabActive = function(tabName) {
            var stateName = 'hey.' + tabName;
            return $state.includes(stateName);
        }



        //
        // Go back
        self.goBack = function(state) {
            if ($ionicHistory.backView() === null) {
                if (state === undefined) {
                    $state.go('hey.timeline')
                } else {
                    $state.go(state)
                }
            } else {
                $ionicHistory.goBack();
            }
        }



        //
        // is auth
        self.isAuth = function() {
            if (localStorage.user) {
                return true;
            } else {
                return false;
            }
        }



        //
        // is admin
        self.isAdmin = function() {
            if ($rootScope.userInfo.id <= 4) {
                return true;
            } else {
                return false;
            }
        }



        //
        // please login first
        self.please_login_first = function() {
            if (!self.isAuth()) {
                $rootScope.signInModal.show();
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
        // An alert dialog
        self.showAlert = function(data) {
            if (data === undefined) {
                data = {
                    title: $filter('translate')('ALERT'),
                    template: ''
                }
            }

            $cordovaDialogs.alert(data.content, data.title).then(function() {
                // callback success
            });
        }



        //
        // A confirm dialog
        self.showConfirm = function(data, doSuccess, doFail) {
            if (data === undefined) {
                data = {
                    title: $filter('translate')('ALERT'),
                    content: ''
                }
            }

            $cordovaDialogs.confirm(data.content, data.title).then(function(buttonIndex) {
                // no button = 0, 'OK' = 1, 'Cancel' = 2
                if (buttonIndex === 1) {
                    doSuccess();
                } else if (buttonIndex === 2) {
                    doFail();
                }
            });
        }



        //
        //
        self.disableNotice = function(text, time) {
            $rootScope.$broadcast('notice:hide');
        }

        self.showNoticeText = function(text, time) {
            if (time === undefined) {
                time = 1288;
            }
            $rootScope.$broadcast('notice:show', $filter('translate')(text));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, time);
            return true;
        }

        self.showNoticeSuccess = function() {
            $rootScope.$broadcast('notice:show', $filter('translate')('SUCCESS'));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, 1288);
            return true;
        }

        self.showNoticeFail = function() {
            $rootScope.$broadcast('notice:show', $filter('translate')('FAIL'));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, 1288);
            return false;
        }


        //
        //
        self.openPage = function(url) {
            var options = {
                location: 'no',
                clearcache: 'yes',
                toolbar: 'yes'
            };

            $cordovaInAppBrowser.open(url, '_blank', options).then(function(event) {
                // success
            })
        }

    }
]);
