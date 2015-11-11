angular.module('weatherService', ['ngCordova'])

.factory('Weather', function ($http, $q, FORECASTIO_KEY) {

	var url = 'http://jalenscript.com/api/fetch/';

    return {
        getWeather: function(lat, long)  {
            return $http.get(url + '?lat=' + lat + '&lng=' + long);
        }
    };
});