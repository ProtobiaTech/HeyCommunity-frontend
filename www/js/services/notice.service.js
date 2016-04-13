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
    self.check = function(params) {
        var q = $http.post(getApiUrl('/notice/check'), params);
        return q;
    }

    //
    self.destroy = function(params) {
        var q = $http.post(getApiUrl('/notice/destroy'), params);
        return q;
    }
}])
