HeyCommunity

.service('NoticeService', ['$http', '$rootScope', '$interval', function($http, $rootScope, $interval) {
    //
    //
    var self = this;
    self.notices = [];


    //
    //
    self.serviceRun = function() {
        $rootScope.loadingShowDisabled = true;
        self.index();

        $interval(function() {
            $rootScope.loadingShowDisabled = true;
            self.index();
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
                self.notices = response.data.data;

                angular.forEach(response.data.data, function(item, $index) {
                    if (item.is_checked != 1) {
                        badgeNum += 1;
                    }
                });
                $rootScope.badgeNum = badgeNum;
                $rootScope.utility.setBadgeNum(badgeNum);
            }
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
            } else {
                $rootScope.utility.showNoticeFail();
            }
        })

        return q;
    }


    //
    //
    self.destroy = function(item) {
        var params = {
            id: item.id
        }

        var q = $http.post(getApiUrl('/notice/destroy'), params);
        q.then(function(response) {
            if (response.status === 200) {
                angular.forEach(self.notices, function(notice, $index) {
                    if (item.id === notice.id) {
                        self.notices.splice($index, 1);
                    }
                })
            } else {
                $rootScope.utility.showNoticeFail();
            }
        })

        return q;
    }
}])
