HeyCommunity

.run(['$rootScope', '$state', function($rootScope, $state) {
    // Auth of Route
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var requireNoSignInStates = [
            'hey-user-signIn',
            'hey-user-signUp',
        ];

        var requireSignInStates = [
            'hey.timeline-create',
            'hey.topic-create',
            'hey-activity-create',
        ];

        if (!localStorage.user) {
            if (inArray(toState.name, requireSignInStates)) {
                event.preventDefault();
                $state.go('hey.user');
                $rootScope.jumpRoute = toState.name;
            }
        } else {
            if (inArray(toState.name, requireNoSignInStates)) {
                event.preventDefault();
                $state.go('hey.user');
            }
        }
    })
}]);
