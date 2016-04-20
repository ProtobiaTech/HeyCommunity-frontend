HeyCommunity

.service('UserService', ['$http', '$rootScope', function($http, $rootScope) {
    // sign up verify
    this.signUpVerifyCaptcha = function(params) {
        var q = $http.post(getApiUrl('/user/sign-up-verify-captcha'), params);
        q.then(function(response) {
            //
        }, function(response) {
            UtilityService.showNoticeFail();
        })

        return q;
    }

    //
    this.signUpGetCaptcha = function(params) {
        var q = $http.post(getApiUrl('/user/get-captcha'), params);
        q.then(function(response) {
            //
        }, function(response) {
            UtilityService.showNoticeFail();
        })

        return q;
    }

    // sign up
    this.signUp = function(params) {
        var q = $http.post(getApiUrl('/user/sign-up'), params);
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.user = JSON.stringify(response.data);
            }
        }, function(response) {
            UtilityService.showNoticeFail();
        });
        return q;
    }

    // sign in
    this.signIn = function(params) {
        var q = $http.post(getApiUrl('/user/sign-in'), params);
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.user = JSON.stringify(response.data);
            }
        }, function(response) {
            UtilityService.showNoticeFail();
        });
        return q;
    }

    // sign out
    this.signOut = function() {
        var q = $http.get(getApiUrl('/user/sign-out'));
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.removeItem('user');

                $rootScope.badgeNum = 0;
                $rootScope.utility.setBadgeNum($rootScope.badgeNum);
            }
        }, function(response) {
            UtilityService.showNoticeFail();
        });
        return q;
    }

    // user info
    this.userInfo = function(id) {
        if (id) {
            var q = $http.get(getApiUrl('/user/user-info/' + id));
        } else {
            var q = $http.get(getApiUrl('/user/user-info'));
        }
        q.then(function(response) {
            if (response.status === 200 && typeof(response.data) === 'object') {
                if (id === undefined) {
                    localStorage.user = JSON.stringify(response.data);
                }
            } else {
                localStorage.removeItem('user');
            }
        }, function(response) {
            UtilityService.showNoticeFail();
        });
        return q;
    }


    // update avatar
    this.updateAvatar = function(http, params) {
        var q = http.upload({
            url: getApiUrl('/user/update-avatar'),
            data: params,
        });

        q.then(function(response) {
            //
        }, function(response) {
            UtilityService.showNoticeFail();
        });

        return q;
    }
}])
