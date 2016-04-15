HeyCommunity

.service('UserReportService', ['$http', '$rootScope', 'UserService', function($http, $rootScope, UserService) {
    var self = this;

    self.type = {
        one6: true,
    }
    self.content = '';


    //
    // can submit
    self.canSubmit = function() {
        for (v in self.type) {
            if (self.type[v] === true) {
                return true;
            }
        }
        return false;
    }


    //
    //
    self.reset = function() {
        self.type = {
            one6: true,
        }

        self.content = '';
    }


    //
    // submit
    self.submit = function() {
        $rootScope.$broadcast('notice:show', $rootScope.filter('translate')('感谢您的报告'));

        $rootScope.timeout(function() {
            $rootScope.$broadcast('notice:hide');
            $rootScope.reportModal.hide();
            self.reset();
        }, 1888)
    }


    //
    //
    self.close = function() {
        $rootScope.reportModal.hide();
        self.reset();
    }
}]);
