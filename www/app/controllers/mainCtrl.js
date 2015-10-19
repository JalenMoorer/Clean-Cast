angular.module('mainCtrl', ['ionic', 'ngCordova'])

.controller('mainController', function (Geolocation, Weather, $timeout){

    var self = this;

    Geolocation.getCoordinates().then(function(position){
        self.coordinates = {lat: position.coords.latitude, long: position.coords.longitude};
        self.getWeather(self.coordinates.lat, self.coordinates.long);
    });

    self.getWeather = function(lat, long) {
        Weather.getWeather(lat, long).success(function(data){
            var currently = data.currently;
            var hourly = data.hourly.data;
            var daily = data.daily.data;
            var alert = data.alerts[0];

            self.currently = currently;
            self.hourly = self.convertHour(hourly);
            self.daily = self.convertTime(daily);
            self.alert = alert;
        });
    };

    self.convertTime = function(daily) {
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        for (var i=0; i < daily.length; i++) {
            var time = new Date(daily[i].time * 1000);
            var day = time.getDay();
            var month = time.getMonth() + 1;
            var date = time.getDate();

            daily[i].time = days[day] + " " + months[month] + " " + date; 
        }

        return daily;
    };

    self.convertHour = function(hourly) {
        for (var i=0; i < hourly.length; i++) {
            var time = new Date(hourly[i].time * 1000);
            var hour = time.getHours();
            var time_period = hour < 12 ? 'AM' : 'PM';

            if (hour > 12) hour = hour % 12;
            if (self.isMidnight(hour)) hour = "12";

            hourly[i].time = hour + " " + time_period;
        }

        return hourly;
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