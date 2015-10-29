angular.module('geolocationService', ['ngCordova'])

.constant('GEONAMES_KEY', 'jalenm%5Fm')

.factory('Geolocation', function ($cordovaGeolocation, GEONAMES_KEY, $http, $q, $timeout) {

    var geonames_url = 'http://api.geonames.org/';
    var geonames_city_url = 'http://geodata.byethost24.com/cities/api/';
    
    function getCurrentCoordinates() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        return $cordovaGeolocation.getCurrentPosition(posOptions);
    }

    function getNearbyPlace(lat, long) {
        return $http.get(geonames_url + 'findNearbyPlaceNameJSON?formatted=true&lat=' + lat +  '&lng=' + long + '&username=' + GEONAMES_KEY + '&style=full');
    }

    function getSearchPlace(location, iso) {
        console.log(location, iso);
        if(iso)
            return $http.get(geonames_city_url + "city?name='" +location[0] +"'&country='" + location[1] + "'");
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

        getSearchedLocation: function(location, iso) {
            return getSearchPlace(location, iso);
        }
    };
});
