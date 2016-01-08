HeyCommunity

.service('UserService', function($http) {
    // sign up verify
    this.signUpVerify = function(params) {
        return $http.post(getApiUrl('/user'), params);
    }

    // sign up
    this.signUp = function(params) {
        return $http.post(getApiUrl('/user'), params);
    }

    // sign in
    this.signIn = function(params) {
        var queryStr = '?phone=' + params.phone + '&password=' + params.password;
        return $http.get(getApiUrl('/user/sign-in' + queryStr)).then(function(response) {
            localStorage.user = JSON.stringify(response.data);
        })
    }

    // sign out
    this.signOut = function() {
        return $http.get(getApiUrl('/timeline')).then(function(response) {
            localStorage.removeItem('user'); // todo remove

            if (response.status) {
                localStorage.removeItem('user');
            } else {
            }
        });
    }
})
