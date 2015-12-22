HeyCommunity

.service('SystemService', function($http) {
    this.getTenantInfo = function() {
        return $http.get(getApiUrl('/tenant/tenant-info'));
    }
})
