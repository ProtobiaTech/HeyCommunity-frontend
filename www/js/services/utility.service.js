HeyCommunity

.service('UtilityService', [
    '$cordovaBadge', '$cordovaDialogs', '$rootScope', '$filter', '$state', '$ionicHistory', '$timeout',
     function($cordovaBadge, $cordovaDialogs, $rootScope, $filter, $state, $ionicHistory, $timeout) {

        //
        // Set badge num
        this.setBadgeNum = function(badgeNum) {
            if (window.cordova) {
                $cordovaBadge.hasPermission().then(function(yes) {
                    $cordovaBadge.set($rootScope.badgeNum).then(function() {
                        // this.showNoticeText('show badge ' + badgeNum);
                    }, function(err) {
                        this.showNoticeText('show badge error');
                    });
                }, function(no) {
                    this.showNoticeText(no);
                });
            } else {
                 return false;
            }
        }



        //
        // tab active
        this.tabActive = function(tabName) {
            var stateName = 'hey.' + tabName;
            return $state.includes(stateName);
        }



        //
        // Go back
        this.goBack = function(state) {
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
        this.isAuth = function() {
            if (localStorage.user) {
                return true;
            } else {
                return false;
            }
        }



        //
        // is admin
        this.isAdmin = function() {
            if ($rootScope.userInfo.id <= 4) {
                return true;
            } else {
                return false;
            }
        }



        //
        // please login first
        this.please_login_first = function() {
            if (!this.isAuth()) {
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
        this.showAlert = function(data) {
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
        this.showConfirm = function(data, doSuccess, doFail) {
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
        this.disableNotice = function(text, time) {
            $rootScope.$broadcast('notice:hide');
        }

        this.showNoticeText = function(text, time) {
            if (time === undefined) {
                time = 1288;
            }
            $rootScope.$broadcast('notice:show', $filter('translate')(text));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, time);
            return true;
        }

        this.showNoticeSuccess = function() {
            $rootScope.$broadcast('notice:show', $filter('translate')('SUCCESS'));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, 1288);
            return true;
        }

        this.showNoticeFail = function() {
            $rootScope.$broadcast('notice:show', $filter('translate')('FAIL'));
            $timeout(function() {
                $rootScope.$broadcast('notice:hide');
            }, 1288);
            return false;
        }

    }
]);
