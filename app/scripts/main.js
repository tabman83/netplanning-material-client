angular.module('NetPlanningApp', ['ngMaterial', 'ngRoute', 'ngMdIcons']).run(function($log, $rootScope, $route) {

	$log.log('NetPlanningApp is running.')
	$rootScope.$route = $route;

}).config(function($mdThemingProvider, $routeProvider, $locationProvider) {

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

});
