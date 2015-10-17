angular.module('mainCtrl', ['ionic', 'ngCordova'])

.controller('mainController', function (Geolocation, Weather, $timeout){

    var self = this;

    Geolocation.getCoordinates().then(function(position){
        self.coordinates = {lat: position.coords.latitude, long: position.coords.longitude};
        self.getWeather(self.coordinates.lat, self.coordinates.long);
    });

    self.getWeather = function(lat, long) {
        Weather.getWeather(lat, long).success(function(data){
            self.currently = data.currently;
            self.hourly = data.hourly;
            self.daily = data.daily;
            console.log(data);
        });
    };

    self.getTime = function() {
        var current_time = new Date();
        var hour = current_time.getHours();
        var min = current_time.getMinutes();
        var second = current_time.getSeconds();

        var time_period = hour < 12 ? 'AM' : 'PM';
        if (hour > 12) hour = hour % 12;
        min = min < 10 ? "0" + min : "" + min;
        if (self.isMidnight(hour)) hour = "12";

        self.showTime = hour + ":" + min + ":" + second + " " + time_period;
        $timeout(self.getTime, 500);
    };

    self.isMidnight = function(hour) {
        if (hour === 0) return true;
    };

    self.getTime();
});