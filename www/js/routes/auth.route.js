HeyCommunity

.run(function($rootScope, $state) {
    // Auth of Route
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var requireNoSignInStates = [
            'hey.user-signIn',
            'hey.user-signUp',
        ];

        var requireSignInStates = [
        ];

        if (!localStorage.user) {
            if (inArray(toState.name, requireSignInStates)) {
                event.preventDefault();
                $state.go('hey.user-signIn');
            }
        } else {
            if (inArray(toState.name, requireNoSignInStates)) {
                event.preventDefault();
                $state.go('hey.user');
            }
        }
    })
});
