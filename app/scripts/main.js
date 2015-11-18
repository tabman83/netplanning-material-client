angular.module('NetPlanningApp', ['ngMaterial', 'ngRoute', 'ngStorage', 'ngResource', 'ngSanitize', 'pascalprecht.translate', 'angularMoment', 'angular.filter', 'angulartics', 'angulartics.google.analytics']).run(function($rootScope, $location, DataService) {
	'use strict';

	$rootScope.$on('$locationChangeStart', function () {
		// redirect to login page if not logged in and trying to access a restricted page
		var restrictedPage = $location.path() !== '/Login';

		if (restrictedPage && !DataService.isLoggedIn) {
			$location.path('/Login');
		}
	});

}).factory('moment', function ($window) {
    'use strict';
    return $window.moment;
}).factory('CryptoJS', function ($window) {
    'use strict';
    return $window.CryptoJS;
}).config(function($mdThemingProvider, $routeProvider, $locationProvider, $compileProvider, $translateProvider) {
	'use strict';

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};

	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

	var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
		'contrastDefaultColor': 'light',
		'contrastDarkColors': ['50'],
		'50': 'ffffff'
	});
	$mdThemingProvider.definePalette('customBlue', customBlueMap);
	$mdThemingProvider.theme('default').primaryPalette('customBlue', {
		'default': '500',
		'hue-1': '50'
	}).accentPalette('pink');

	$routeProvider.when('/Today', {
		templateUrl: 'views/today.html',
		controller: 'DayCtrl',
		controllerAs: 'day'
	}).when('/Tomorrow', {
		templateUrl: 'views/tomorrow.html',
		controller: 'DayCtrl',
		controllerAs: 'day'
	}).when('/All', {
		templateUrl: 'views/all.html',
		controller: 'DayCtrl',
		controllerAs: 'day'
	}).when('/New', {
		templateUrl: 'views/new.html',
		controller: 'ChangesCtrl',
		controllerAs: 'changes'
	}).when('/Cancelled', {
		templateUrl: 'views/cancelled.html',
		controller: 'ChangesCtrl',
		controllerAs: 'changes'
	}).when('/Settings', {
		templateUrl: 'views/settings.html'
	}).when('/About', {
		templateUrl: 'views/about.html'
	}).otherwise({
		redirectTo: '/Today'
	});

	// does not play nicely with nw.js
	//$locationProvider.html5Mode(true);

	$translateProvider.useStaticFilesLoader({
		prefix: 'locales/',
		suffix: '.json'
	});
	$translateProvider.useSanitizeValueStrategy('escape');

});
