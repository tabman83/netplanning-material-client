angular.module('NetPlanningApp', ['ngMaterial', 'ngRoute', 'ngStorage', 'pascalprecht.translate', 'angularMoment']).run(function($log, $translate) {

	$log.log('NetPlanningApp is running.');

}).config(function($mdThemingProvider, $routeProvider, $locationProvider, $translateProvider) {

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
		controller: 'LessonsCtrl',
		controllerAs: 'today'
	}).when('/Tomorrow', {
		templateUrl: 'views/tomorrow.html',
		controller: 'LessonsCtrl',
		controllerAs: 'tomorrow'
	}).when('/All', {
		templateUrl: 'views/all.html',
		controller: 'LessonsCtrl',
		controllerAs: 'all'
	}).when('/Settings', {
		templateUrl: 'views/settings.html',
		controller: 'SettingsCtrl',
		controllerAs: 'settings'
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
