angular.module('weatherService', ['ngCordova'])

.constant('FORECASTIO_KEY', '7eaa3d726ceecc1937bb96a6be95b13c')

.factory('Weather', function ($http, $q, FORECASTIO_KEY) {

	var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    return {
        getWeather: function(lat, long)  {
            return $http.jsonp(url + lat + ',' + long + "?callback=JSON_CALLBACK");
        }
    };
});