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
		controller: 'TodayCtrl',
		controllerAs: 'today'
	}).when('/Tomorrow', {
		templateUrl: 'views/tomorrow.html',
		controller: 'TomorrowCtrl',
		controllerAs: 'tomorrow'
	}).when('/Settings', {
		templateUrl: 'views/settings.html',
		controller: 'SettingsCtrl',
		controllerAs: 'settings'
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
