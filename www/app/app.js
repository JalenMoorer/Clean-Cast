// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'mainCtrl', 'geolocationService', 'weatherService', 'localStorageService'])
  
.config(function($ionicConfigProvider) {  
  //Disable JS scrolling on Android to imrpove performance
  if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.navigator && window.navigator.splashscreen) {
      window.plugins.orientationLock.unlock();
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
