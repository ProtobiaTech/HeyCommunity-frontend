HeyCommunity

// tab.user
.controller('UserIndexCtrl', ['$scope', function($scope) {
    if (localStorage.user) {
        $scope.user = JSON.parse(localStorage.user);
    }
}])



// tab.user-signOut
.controller('UserSignOutCtrl', ['$scope', 'UserService', '$ionicHistory', function($scope, UserService, $ionicHistory) {
    $scope.$root.$broadcast('loading:show');

    UserService.signOut().then(function(response) {
        if (response.status === 200) {
            $ionicHistory.clearCache();
            $scope.state.go('hey.user');
        } else {
            $scope.state.go('hey-user-setup');
        }
    });
}])



// tab.user-signIn
.controller('UserSignInCtrl', ['$scope', 'UserService', '$ionicHistory', function($scope, UserService, $ionicHistory) {
    $scope.user = {};
    $scope.formError = {};
    if (localStorage.tenantInfo) {
        $scope.tenantInfo = JSON.parse(localStorage.tenantInfo);
    }

    $scope.signIn = function() {
        $scope.$root.$broadcast('loading:show');

        var params = {
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signIn(params).then(function(response) {
            if (response.status === 200) {
                $ionicHistory.clearCache();
                if ($scope.jumpRoute) {
                    $scope.state.go($scope.jumpRoute);
                } else {
                    $scope.state.go('hey.user');
                }
            } else {
                $scope.formError = {1: ['PHONE_OR_PASSWORD_ERROR']};
            }
        });
    }
}])



// tab.user-signUp
.controller('UserSignUpCtrl', ['$scope', 'UserService', '$timeout', function($scope, UserService, $timeout) {
    $scope.user = {};
    $scope.signUpStep = 1;
    $scope.getCaptchaBtnDefaultText = 'GET_CAPTCHA';
    $scope.getCaptchaBtnText = 'GET_CAPTCHA';
    $scope.getCaptchaValid = true;
    if (localStorage.tenantInfo) {
        $scope.tenantInfo = JSON.parse(localStorage.tenantInfo);
    }

    $scope.setVal = function(key, val) {
        $scope[key] = val;
    }

    // get captcha
    $scope.getCaptcha = function() {
        if ($scope.getCaptchaValid) {
            var params = {
                phone: $scope.user.phone,
            }
            UserService.signUpGetCaptcha(params).then(function(response) {
                if (response.status === 200) {
                    $scope.getCaptchaValid = false;
                    getCaptchaTimeout(60);
                } else {
                    var content = typeof response.data === 'string' ? response.data : response.data.phone[0];
                    $scope.showAlert({title: $scope.filter('translate')('ERROR'), content: content});
                }
            });
        }
    }

    var getCaptchaTimeout = function(second) {
        if (second > 0) {
            $scope.getCaptchaBtnText = second + 's';
            $timeout(function() {
                getCaptchaTimeout(second - 1)
            }, 1000);
        } else {
            $scope.getCaptchaBtnText = $scope.getCaptchaBtnDefaultText;
            $scope.getCaptchaValid = true;
        }
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
                var content = typeof response.data === 'string' ? response.data : response.data.phone[0];
                $scope.showAlert({title: $scope.filter('translate')('ERROR'), content: content});
                $scope.user.captcha = '';
            }
        });
    }

    // sign up
    $scope.signUp = function () {
        $scope.$root.$broadcast('loading:show');

        var params = {
            nickname: $scope.user.nickname,
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signUp(params).then(function(response) {
            if (response.status === 200) {
                $scope.state.go('hey.timeline');
            } else {
                for (item in response.data) {
                    var content = response.data[item][0];
                }
                $scope.showAlert({title: $scope.filter('translate')('ERROR'), content: content});
            }
        });
    }
}])



// tab.user-info
.controller('UserInfoCtrl', ['$scope', 'UserService', function($scope, UserService) {
    $scope.user = JSON.parse(localStorage.user);
}])



// tab.user-setup
.controller('UserSetupCtrl', ['$scope', 'UserService', function($scope, UserService) {
}])


// tab.user-setup-general-language
.controller('UserSetupGeneralLanguageCtrl', ['$scope', 'UserService', '$translate', function($scope, UserService, $translate) {
    $scope.language = localStorage.appLanguage;

    $scope.changeLanguage = function(language) {
        localStorage.appLanguage = language;
        $translate.use(language);
    }
}])
