// Ionic Starter App
var db = null;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'mainCtrl', 'geolocationService', 'weatherService', 'dbService'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    window.plugins.sqlDB.copy("zip.db", function() {
    db = $cordovaSQLite.openDB("zip.db");
    }, function(error) {
    console.error("There was an error copying the database: " + error);
    db = $cordovaSQLite.openDB("zip.db");
    });
  });
});
