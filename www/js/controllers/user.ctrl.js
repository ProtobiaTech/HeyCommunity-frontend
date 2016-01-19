HeyCommunity

// tab.user
.controller('UserIndexCtrl', function($scope, $rootScope) {
    if (!localStorage.user) {
        /** auto jump to signIn page
        setTimeout(function() {
            $scope.state.go('hey.user-signIn');
        }, 800);
        */
    } else {
        $scope.user = JSON.parse(localStorage.user);
    }
})



// tab.user-signOut
.controller('UserSignOutCtrl', function($scope, UserService) {
    UserService.signOut().then(function() {
        $scope.state.go('hey.user');
    });
})



// tab.user-signIn
.controller('UserSignInCtrl', function($scope, UserService) {
    if (localStorage.user) {
        $scope.state.go('hey.user');
    }

    $scope.user = {};
    $scope.formError = {};

    $scope.signIn = function() {
        var params = {
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signIn(params).then(function(response) {
            if (response.status === 200) {
                $scope.state.go('hey.user')
            } else {
                $scope.formError = {1: ['PHONE_OR_PASSWORD_ERROR']};
            }
        });
    }
})



// tab.user-signUp
.controller('UserSignUpCtrl', function($scope, UserService) {
    if (localStorage.user) {
        $scope.state.go('hey.user');
    }

    $scope.user = {};
    $scope.signUpStep = 1;
    $scope.formError = {};

    $scope.setVal = function(key, val) {
        $scope[key] = val;
    }

    // get captcha
    $scope.getCaptcha = function() {
        // check phone is exists
        // seed code
        alert('next');
    }

    // sign up verify
    $scope.signUpVerifyCaptcha = function() {
        params = {
            phone: $scope.user.phone,
            captcha: $scope.user.captcha,
        }
        UserService.signUpVerifyCaptcha(params).then(function(response) {
            if (response.status === 200) {
                $scope.signUpStep = 2;
                $scope.formError = {};
            } else {
                $scope.formError = response.data;
            }
        });
    }

    // sign up
    $scope.signUp = function () {
        console.log($scope.user);
        var params = {
            nickname: $scope.user.nickname,
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signUp(params).then(function(response) {
            if (response.status === 200) {
                $scope.state.go('hey.timeline');
            } else {
                $scope.formError = response.data;
            }
        });
    }
})



// tab.user-info
.controller('UserInfoCtrl', function($scope, UserService) {
    $scope.user = JSON.parse(localStorage.user);
})



// tab.user-setup
.controller('UserSetupCtrl', function($scope, UserService) {
})
