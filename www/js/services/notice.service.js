HeyCommunity

.service('NoticeService', ['$http', '$rootScope', '$interval', function($http, $rootScope, $interval) {
    //
    //
    var self = this;
    self.notices = [];


    //
    //
    self.serviceRun = function() {
        if ($rootScope.utility.isAuth()) {
            $rootScope.loadingShowDisabled = true;
            self.index();
        }

        $interval(function() {
            if ($rootScope.utility.isAuth()) {
                $rootScope.loadingShowDisabled = true;
                self.index();
            }
        }, 1000*60*1)
    }


    //
    //
    self.index = function(params) {
        var url = getApiUrl('/notice');
        var q = $http.get(url);

        q.then(function(response) {
            if (response.status === 200) {
                var badgeNum = 0;
                self.notices = response.data;

                angular.forEach(self.notices, function(item, $index) {
                    if (item.is_checked != 1) {
                        badgeNum += 1;
                    }
                });
                $rootScope.badgeNum = badgeNum;
                $rootScope.utility.setBadgeNum($rootScope.badgeNum);
            }
        }, function() {
            UtilityService.showNoticeFail();
        });

        return q;
    }


    //
    //
    self.check = function($index) {
        var notice = self.notices[$index];
        var params = {
            id: notice.id
        }

        var q = $http.post(getApiUrl('/notice/check'), params);
        q.then(function(response) {
            if (response.status === 200) {
                self.notices[$index].is_checked = true;

                var badgeNum = 0;
                angular.forEach(self.notices, function(item, $index) {
                    if (item.is_checked != 1) {
                        badgeNum += 1;
                    }
                });
            } else {
                $rootScope.utility.showNoticeFail();
            }

            $rootScope.badgeNum = badgeNum;
            $rootScope.utility.setBadgeNum($rootScope.badgeNum);
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    //
    //
    self.destroy = function(notice) {
        var params = {
            id: notice.id
        }

        var q = $http.post(getApiUrl('/notice/destroy'), params);
        q.then(function(response) {
            if (response.status === 200) {
                var badgeNum = 0;
                angular.forEach(self.notices, function(item, $index) {
                    if (item.id === notice.id) {
                        self.notices.splice($index, 1);
                    } else if (item.is_checked != 1) {
                        badgeNum += 1;
                    }
                })
            } else {
                $rootScope.utility.showNoticeFail();
            }

            $rootScope.badgeNum = badgeNum;
            $rootScope.utility.setBadgeNum($rootScope.badgeNum);
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }
}])
