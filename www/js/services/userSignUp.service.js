HeyCommunity

.service('UserSignUpService', ['$http', '$rootScope', 'UserService', function($http, $rootScope, UserService) {
    //
    //
    var self = this;

    self.user = {};
    self.signUpStep = 1;
    self.getCaptchaBtnDefaultText = 'GET_CAPTCHA';
    self.getCaptchaBtnText = 'GET_CAPTCHA';
    self.getCaptchaValid = true;

    self.setVal = function(key, val) {
        self[key] = val;
    }

    // get captcha
    self.getCaptcha = function() {
        if (self.getCaptchaValid) {
            var params = {
                phone: self.user.phone,
            }
            UserService.signUpGetCaptcha(params).then(function(response) {
                if (response.status === 200) {
                    self.getCaptchaValid = false;
                    getCaptchaTimeout(60);
                } else {
                    var content = typeof response.data === 'string' ? response.data : response.data.phone[0];
                    $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
                }
            });
        }
    }

    var getCaptchaTimeout = function(second) {
        if (second > 0) {
            self.getCaptchaBtnText = second + 's';
            $rootScope.timeout(function() {
                getCaptchaTimeout(second - 1)
            }, 1000);
        } else {
            self.getCaptchaBtnText = self.getCaptchaBtnDefaultText;
            self.getCaptchaValid = true;
        }
    }

    // sign up verify
    self.signUpVerifyCaptcha = function() {
        params = {
            phone: self.user.phone,
            captcha: self.user.captcha,
        }
        UserService.signUpVerifyCaptcha(params).then(function(response) {
            if (response.status === 200) {
                self.signUpStep = 2;
            } else {
                var content = typeof response.data === 'string' ? response.data : response.data.phone[0];
                $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
                self.user.captcha = '';
            }
        });
    }

    // sign up
    self.signUp = function () {
        var params = {
            nickname: self.user.nickname,
            phone: self.user.phone,
            password: self.user.password,
        }
        UserService.signUp(params).then(function(response) {
            if (response.status === 200) {
                $rootScope.signUpModal.hide();
                $rootScope.state.go('hey.timeline');
            } else {
                for (item in response.data) {
                    var content = response.data[item][0];
                }
                $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
            }
        });
    }

}])
