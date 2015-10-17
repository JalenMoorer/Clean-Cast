angular.module('geolocationService', ['ngCordova'])

.factory('Geolocation', function ($cordovaGeolocation, $q, $timeout) {
    
    function getCurrentCoordinates() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        return $cordovaGeolocation.getCurrentPosition(posOptions);
    }

    return {
        getCoordinates: function() {
            var promise = getCurrentCoordinates();
            var defer = $q.defer();
            $timeout(function () {
                defer.resolve(promise);
            });
            return defer.promise;
        }
    };
});
