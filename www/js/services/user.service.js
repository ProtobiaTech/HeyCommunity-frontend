HeyCommunity

.service('UserService', ['$http', function($http) {
    // sign up verify
    this.signUpVerifyCaptcha = function(params) {
        return $http.post(getApiUrl('/user/sign-up-verify-captcha'), params);
    }

    //
    this.signUpGetCaptcha = function(params) {
        var q = $http.post(getApiUrl('/user/get-captcha'), params);
        return q;
    }

    // sign up
    this.signUp = function(params) {
        var q = $http.post(getApiUrl('/user/sign-up'), params);
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.user = JSON.stringify(response.data);
            }
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
        });
        return q;
    }

    // sign out
    this.signOut = function() {
        var q = $http.get(getApiUrl('/user/sign-out'));
        q.then(function(response) {
            if (response.status === 200) {
                localStorage.removeItem('user');
            }
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
        });
        return q;
    }


    // update avatar
    this.updateAvatar = function(http, params) {
        return http.upload({
            url: getApiUrl('/user/update-avatar'),
            data: params,
        })
    }
}])
