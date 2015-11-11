angular.module('NetPlanningApp', ['ngMaterial', 'ngRoute', 'ngStorage', 'ngResource', 'pascalprecht.translate', 'angularMoment', 'angular.filter', 'angulartics', 'angulartics.google.analytics']).run(function($rootScope, $location, DataService) {
	'use strict';

	$rootScope.$on('$locationChangeStart', function () {
		// redirect to login page if not logged in and trying to access a restricted page
		var restrictedPage = $location.path() !== '/Login';

		if (restrictedPage && !DataService.isLoggedIn()) {
			$location.path('/Login');
		}
	});

}).factory('moment', function ($window) {
    'use strict';
    return $window.moment;
}).factory('CryptoJS', function ($window) {
    'use strict';
    return $window.CryptoJS;
}).config(function($mdThemingProvider, $routeProvider, $locationProvider, $translateProvider) {
	'use strict';

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};

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
	}).when('/Settings', {
		templateUrl: 'views/settings.html',
		controller: 'SettingsCtrl',
		controllerAs: 'settings'
	}).when('/About', {
		templateUrl: 'views/about.html'
	}).when('/Login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl',
		controllerAs: 'login'
	}).otherwise({
		redirectTo: '/Today'
	});

	$locationProvider.html5Mode(true);

	$translateProvider.useStaticFilesLoader({
		prefix: 'locales/',
		suffix: '.json'
	});
	$translateProvider.useSanitizeValueStrategy('escape');

});
