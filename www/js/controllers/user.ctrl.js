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

    $scope.user = {phone: 17090402884, captcha: 1234, password: 'hey community'}

    $scope.signIn = function() {
        var params = {
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signIn(params).then(function(response) {
            $scope.state.go('hey.user')
        });
    }
})



// tab.user-signUp
.controller('UserSignUpCtrl', function($scope, UserService) {
    if (localStorage.user) {
        $scope.state.go('hey.user');
    }

    $scope.signUpStep = 1;
    $scope.user = {phone: 17090402884, captcha: 1234}


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
    $scope.signUpVerify = function() {
        params = {
            phone: $scope.user.phone,
            captcha: $scope.user.captcha,
        }
        UserService.signUpVerify(params).then(function(response) {

            $scope.signUpStep = 2;
        });
    }

    // sign up
    $scope.signUp = function () {
    }
})



// tab.user-info
.controller('UserInfoCtrl', function($scope, UserService) {
})



// tab.user-setup
.controller('UserSetupCtrl', function($scope, UserService) {
})
