HeyCommunity

.service('UtilityService', [
    '$cordovaBadge', '$cordovaDialogs', '$rootScope', '$filter',
     function($cordovaBadge, $cordovaDialogs, $rootScope, $filter) {

        //
        // Set badge num
        this.setBadgeNum = function(badgeNum) {
            if (window.cordova) {
                $cordovaBadge.hasPermission().then(function(yes) {
                    $cordovaBadge.set($rootScope.badgeNum).then(function() {
                        // $rootScope.showNoticeText('show badge ' + badgeNum);
                    }, function(err) {
                        $rootScope.showNoticeText('show badge error');
                    });
                }, function(no) {
                    $rootScope.showNoticeText(no);
                });
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
