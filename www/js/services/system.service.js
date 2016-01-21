HeyCommunity

.service('SystemService', ['$http', function($http) {
    this.getTenantInfo = function() {
        return $http.get(getApiUrl('/tenant/tenant-info'));
    }
}])
