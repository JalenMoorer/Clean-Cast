angular.module('mainCtrl', ['ionic', 'ngCordova'])

.controller('mainController', function (Geolocation, Weather, $ionicSlideBoxDelegate, $ionicScrollDelegate, $localstorage, $interval){

    var self = this;
    self.processing = true;

    self.buttons = [
        { name: 'Current'},
        { name: 'Hourly'},
        { name: 'Daily'}
    ];

    self.slide = function(index) {
        $ionicScrollDelegate.scrollTop();
        self.current = index;
        $ionicSlideBoxDelegate.slide(index);
    };

    function getCoordinates() {
        Geolocation.getCoordinates().then(function(position){
            self.coordinates = {lat: position.coords.latitude, long: position.coords.longitude};
            getWeather(self.coordinates.lat, self.coordinates.long);
            console.log(self.coordinates);
        });
    }

    function getWeather (lat, long) {
        Weather.getWeather(lat, long).success(function(data){
            var currently = data.currently;
            var hourly = data.hourly.data;
            var daily = data.daily.data;

            self.currently = currently;
            self.hourly = convertHour(hourly);
            self.daily = convertTime(daily);

            getLocation(lat, long);
        });
    }

    function getLocation (lat, long) {
        Geolocation.getCurrentLocation(lat, long).success(function(data) {
            var location = data.geonames[0];
            self.location = location;
            self.processing = false;
        });
    }

    function convertTime (daily) {
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        for (var i=0; i < daily.length; i++) {
            var time = new Date(daily[i].time * 1000);
            var day = time.getDay();
            var month = time.getMonth();
            var date = time.getDate();

            daily[i].time = days[day] + " " + months[month] + " " + date; 
        }

        return daily;
    }

    function convertHour (hourly) {
        for (var i=0; i < hourly.length; i++) {
            var time = new Date(hourly[i].time * 1000);
            var hour = time.getHours();
            var time_period = hour < 12 ? 'AM' : 'PM';

            if (hour > 12) hour = hour % 12;
            if (isMidnight(hour)) hour = "12";

            hourly[i].time = hour + " " + time_period;
        }

        return hourly;
    }


    function isMidnight (hour) {
        if (hour === 0) return true;
    }

    function init() {
        getCoordinates();
        console.log("Init Called");
    }

    init();
    $interval(init, 60*60*1000);
});