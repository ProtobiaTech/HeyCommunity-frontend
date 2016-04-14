HeyCommunity

.service('UserSignInService', ['$http', '$rootScope', 'UserService', function($http, $rootScope, UserService) {
    var self = this;

    //
    //
    self.signIn = function() {
        var params = {
            phone: self.phone,
            password: self.password,
        }
        UserService.signIn(params).then(function(response) {
            if (response.status === 200) {
                $rootScope.userInfo = response.data;

                $rootScope.signInModal.hide();
                if ($rootScope.jumpRoute) {
                    $rootScope.state.go($rootScope.jumpRoute);
                } else {
                    $rootScope.state.go('hey.user');
                }
            } else {
                var content = $rootScope.filter('translate')('PHONE_OR_PASSWORD_ERROR');
                $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
            }
        });
    }
}])
