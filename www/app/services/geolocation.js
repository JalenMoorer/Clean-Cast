angular.module('geolocationService', ['ngCordova'])

.constant('GEONAMES_KEY', 'jalenm%5Fm')

.factory('Geolocation', function ($cordovaGeolocation, GEONAMES_KEY, $http, $q, $timeout) {

    var url = 'http://api.geonames.org/';
    
    function getCurrentCoordinates() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        return $cordovaGeolocation.getCurrentPosition(posOptions);
    }

    function getNearbyPlace(lat, long) {
        return $http.get(url + 'findNearbyPlaceNameJSON?formatted=true&lat=' + lat +  '&lng=' + long + '&username=' + GEONAMES_KEY + '&style=full');
    }

    return {
        getCoordinates: function() {
            var promise = getCurrentCoordinates();
            var defer = $q.defer();
            $timeout(function () {
                defer.resolve(promise);
            });
            return defer.promise;
        },

        getCurrentLocation: function(lat, long) {
            return getNearbyPlace(lat, long);
        }
    };
});
