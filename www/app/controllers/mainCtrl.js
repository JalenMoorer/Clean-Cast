angular.module('mainCtrl', ['ionic', 'ngCordova'])

.controller('mainController', function(Geolocation, Weather){

    var self = this;

    Geolocation.getCoordinates().then(function(position){
        self.coordinates = {lat: position.coords.latitude, long: position.coords.longitude};
        getWeather(self.coordinates.lat, self.coordinates.long);
    });

    function getWeather(lat, long) {
        Weather.getWeather(lat, long).success(function(data){
            self.currently = data.currently;
            self.hourly = data.hourly;
            self.daily = data.daily;
        });
    }
});