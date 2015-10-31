angular.module('NetPlanningApp', ['ngMaterial', 'ngRoute', 'ngMdIcons', 'pascalprecht.translate']).run(function($log, $translate) {

	$log.log('NetPlanningApp is running.');

	$translate.use('en');

}).config(function($mdThemingProvider, $routeProvider, $locationProvider, $translateProvider) {

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
