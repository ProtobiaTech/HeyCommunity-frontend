HeyCommunity

// deving
.controller('SingleDevingCtrl', ['$scope',  function($scope) {
    $scope.localStorage = localStorage;

    console.log(navigator)
    $scope.env = {
        navigatorLanguage: navigator.language,
    };

    $scope.destroyLocalStorage = function() {
        localStorage.clear();
        console.log(localStorage);
    }
}]);
