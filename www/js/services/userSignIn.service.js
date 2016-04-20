HeyCommunity

.service('UserSignInService', ['$http', '$rootScope', 'UserService', 'NoticeService', function($http, $rootScope, UserService, NoticeService) {
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

                $rootScope.loadingShowDisabled = true;
                NoticeService.index();

                $rootScope.signInModal.hide();
            } else {
                var content = $rootScope.filter('translate')('PHONE_OR_PASSWORD_ERROR');
                $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
            }
        });
    }
}])
