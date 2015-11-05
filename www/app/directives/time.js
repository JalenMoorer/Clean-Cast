angular.module('Time', ['ngCordova', 'mainCtrl'])

.directive('convertHour', function() {

	return {
		restrict: 'AE',
		replace: true,
		bindToController: true,
		link: function (scope, element, at, ctrl) {
			var hourly = scope.hourly;
			for (var i=0; i < hourly.length; i++) {
            	var time = new Date(hourly[i].time * 1000);
            	var hour = time.getHours();
            	var time_period = hour < 12 ? 'AM' : 'PM';

            	if (hour > 12) hour = hour % 12;
            	if (hour === 0) hour = "12";

            	hourly[i].time = hour + " " + time_period;
			}
		}
	};
})

.directive('convertDay', function () {

	return {
		restrict: 'AE',
		replace: true,
		bindtoController: true,
		link: function (scope, element, at, ctrl) {
			var daily = scope.daily;
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        	var months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        	for (var i=0; i < daily.length; i++) {
            	var time = new Date(daily[i].time * 1000);
            	var day = time.getDay();
            	var month = time.getMonth();
            	var date = time.getDate();

            	daily[i].time = days[day] + " " + months[month] + " " + date; 
        	}
		}
	};
});