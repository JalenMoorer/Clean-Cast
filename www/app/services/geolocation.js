angular.module('geolocationService', ['ngCordova'])

.constant('GEONAMES_KEY', 'jalenm%5Fm')

.factory('Geolocation', function ($cordovaGeolocation, GEONAMES_KEY, $http, $q, $timeout) {

    var geonames_url = 'http://api.geonames.org/';
    
    function getCurrentCoordinates() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        return $cordovaGeolocation.getCurrentPosition(posOptions);
    }

    function getNearbyPlace(lat, long) {
        return $http.get(geonames_url + 'findNearestAddressJSON?formatted=true&lat=' + lat + '&lng=' + long + '&username=' + GEONAMES_KEY + '&style=full');
    }

    function testCall() {
        return $http.get('http://localhost:3000/');
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
        },

        test: function(){
            return testCall();
        }
    };
});
