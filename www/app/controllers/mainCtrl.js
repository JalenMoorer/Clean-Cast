angular.module('mainCtrl', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 100);
 });
})

.controller('mainController', function (Geolocation, Weather, $ionicSlideBoxDelegate, $ionicScrollDelegate, $localstorage, $interval, $ionicPopup){

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

    self.showAlert = function() {
        var time = new Date(self.alerts.time * 1000);
        var expires = new Date(self.alerts.expires * 1000);
       var alertPopup = $ionicPopup.alert({
            title: self.alerts.title,
            subTitle: "From: " + time + " To: " + expires,
            template: self.alerts.description
        });
        alertPopup.then(function(res) {
            console.log('Alert Closed');
       });
    };

    function getCoordinates() {
        Geolocation.getCoordinates().then(function(position){
            self.coordinates = {lat: position.coords.latitude, long: position.coords.longitude};
            console.log( Math.floor(self.coordinates.lat* 10000) / 10000 );
            console.log( Math.floor(self.coordinates.long * 10000) / 10000 );
            getWeather(self.coordinates.lat, self.coordinates.long);
        });
    }

    function getWeather (lat, long) {
        Weather.getWeather(lat, long).success(function(data){
            self.currently = data.currently;
            var hourly = data.hourly.data;
            self.daily = data.daily.data;

            hourly = convertHour(hourly);
            self.daily = convertTime(self.daily);    
            self.hourly = hourly.splice(1,7);
            console.log(data);

            if (typeof data.alerts != "undefined") {
                self.alerts = data.alerts;
            }
        
            getLocation(lat, long);
        });
    }

    function getLocation (lat, long) {
        Geolocation.getCurrentLocation(lat, long).success(function(data) {
            self.location = data.address;
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
            if (hour === 0) hour = "12";

            hourly[i].time = hour + " " + time_period;
        }

        return hourly;
    }

    function init() {
        getCoordinates();
        console.log("Init Called");
    }

    init();

    /* Time in Milliseconds 60*60*1000* 3600000*/
    $interval(init, 60000);
});