angular.module('mainCtrl', ['ionic', 'ngCordova'])

.controller('mainController', function (Geolocation, Weather, $ionicSlideBoxDelegate, $ionicScrollDelegate, $localstorage, $interval, $scope){

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
        });
    }

    function getWeather (lat, long) {
        Weather.getWeather(lat, long).success(function(data){
            self.currently = data.currently;
            self.hourly = data.hourly.data;
            self.daily = data.daily.data;

            $scope.hourly = self.hourly;
            $scope.daily = self.daily;

            getLocation(lat, long);
        });
    }

    function getLocation (lat, long) {
        Geolocation.getCurrentLocation(lat, long).success(function(data) {
            self.location = data.address;
            self.processing = false;
        });
    }

    function init() {
        getCoordinates();
        console.log("Init Called");
    }

    init();
    $interval(init, 60*60*1000);
});