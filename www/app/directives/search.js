angular.module('searchDirective', ['ngCordova'])

.directive('showSearch', function () {
	return {
		restrict : 'AE',
		templateUrl: 'app/directives/my-search.html',
		replace: true
	};
})

.directive('showHeader', function () {
	return {
		restrict: 'AE',
		templateUrl: 'app/directives/my-header.html',
		replace: true
	};
});