angular.module('NetPlanningApp', ['ngMaterial', 'ngRoute', 'ngMdIcons', 'pascalprecht.translate', 'angularMoment']).run(function($log, $translate) {

	$log.log('NetPlanningApp is running.');

	$translate.use('en');

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
		controllerAs: 'today',
		name: 'TODAY'
	}).when('/Tomorrow', {
		templateUrl: 'views/tomorrow.html',
		controller: 'TomorrowCtrl',
		controllerAs: 'tomorrow',
		name: 'TOMORROW'
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
