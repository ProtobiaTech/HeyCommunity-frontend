angular.module('starter.controllers', [])

.controller('PlusController', function($scope) {
    $scope.navTitle='What news';

    $scope.addPic = function() {
        angular.element('#file').click();
    }

    $scope.setPic = function(files) {
        $scope.pic = 'img/ag3.jpg';
    }
})

.controller('TimelineController', function($scope) {
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
    $scope.navTitle='Hey Ganzhou';
})

.controller('ActivityController', function($scope) {
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
})

.controller('GroupController', function($scope, Locales,$ionicFilterBar) {
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.locales = Locales.all();
        $scope.remove = function(local) {
            Locales.remove(local);
        };

        $scope.favorito = function(local){

        };

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.locales,
                update: function (filteredItems, filterText) {
                    $scope.locales = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

})

.controller('AlbunesController', function($scope, $stateParams, Locales) {
        var local_id = $stateParams.fotosId;
        $scope.local = Locales.get($stateParams.fotosId);

        $scope.items = [
            {
                src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_000.jpg',
                sub: ''
            },
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_001.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_002.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_003.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_004.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_005.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_006.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_007.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_008.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_009.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_010.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_011.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_012.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_013.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_014.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_015.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_016.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_017.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_018.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_019.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_020.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_021.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_022.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_023.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_024.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_025.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_026.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_027.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_028.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_029.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_030.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_031.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_032.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_033.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_034.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_035.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_036.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_037.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_038.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_039.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_040.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_041.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_042.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_043.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_044.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_045.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_046.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_047.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_048.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_049.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_050.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_051.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_052.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_053.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_054.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_055.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_056.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_057.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_058.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_059.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_060.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_061.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_062.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_063.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_064.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_065.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_066.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_067.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_068.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_069.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_070.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_071.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_072.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_073.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_074.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_075.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_076.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_077.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_078.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_079.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_080.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_081.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_082.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_083.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_084.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_085.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_086.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_087.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_088.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_089.jpg'},

            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_090.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_091.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_092.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_093.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_094.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_095.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_096.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_097.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_098.jpg'},
            {src:'http://zonadeclubs.com/imagenes/Albumes/7041/foto_099.jpg'},
        ]


})

.controller('FavoritosController', function($scope) {})

.controller('AjustesController', function($scope) {
        $scope.settings = {
            enviarNotificaciones: true
        };
});
