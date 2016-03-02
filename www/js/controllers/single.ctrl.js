HeyCommunity

// deving
.controller('SingleDevingCtrl', ['$scope',  function($scope) {
    $scope.localStorage = localStorage;

    $scope.destroyLocalStorage = function() {
        localStorage.clear();
        console.log(localStorage);
    }
}]);
