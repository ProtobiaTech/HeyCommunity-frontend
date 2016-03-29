HeyCommunity


.filter('nl2br', ['$sce', function ($sce) {
    return function (text) {
        text = text ? text.replace(/\n/g, '<br>') : '';
        return $sce.trustAsHtml(text);
    };
}])

.filter('momentDate', ['$sce', function ($sce) {
    return function (date) {
        return moment.utc(date).format();
    };
}]);
