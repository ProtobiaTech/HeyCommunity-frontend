HeyCommunity

.service('UserService', ['$http', function($http) {
    // sign up verify
    this.signUpVerifyCaptcha = function(params) {
        return $http.post(getApiUrl('/user/sign-up-verify-captcha'), params);
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
        var q = $http.get(getApiUrl('/timeline'));
        q.then(function(response) {
            localStorage.removeItem('user'); // todo remove

            if (response.status === 200) {
                localStorage.removeItem('user');
            }
        });
        return q;
    }
}])
