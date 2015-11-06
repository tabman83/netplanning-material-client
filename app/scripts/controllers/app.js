angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav, $mdDialog, $scope, $location, $localStorage, $translate, DataService) {

	var vm = this;

	$localStorage.$default({
		language: 'en'
	});

	vm.isLoggedIn = false;
	$scope.$watch( function() {
		return DataService.isLoggedIn()
	}, function(val) {
		vm.isLoggedIn = val;
	});

	vm.items = DataService.items;
	vm.lastUpdate = DataService.lastUpdate;

	$scope.$watch(function() {
		return $localStorage.language;
	}, function(val) {
		$translate.use(val);
	});

	$translate.use($localStorage.language);

	vm.logout = function() {
		var title = $translate.instant('LOGOUT').capitalize();
		var content = $translate.instant('ARE_YOU_SURE_YOU_WANT_TO_LOGOUT').capitalize() + ' ?';
		var btnOk = $translate.instant('OK');
		var btnCancel = $translate.instant('CANCEL');

		var dialog = $mdDialog
			.confirm()
			.title(title)
			.content(content)
			.ariaLabel('Lessons cancellation')
			.ok(btnOk)
			.cancel(btnCancel);
		$mdDialog
			.show(dialog)
			.then(DataService.logout)
			.then(function() {
				$location.url('/Login');
			});
	};

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	vm.cancelSelection = function() {
		angular.forEach(DataService.items, function(item) {
			item.isSelected = false;
		});
	};

	vm.cancelLessons = function() {
		var numLessons = DataService.items.filter(function(item) {
			return item.isSelected;
		}).length;

		var title = $translate.instant('LESSONS_CANCELLATION').capitalize();
		var content = $translate.instant('YOU_ARE_ABOUT_TO_CANCEL', { num: numLessons }).capitalize() + '.';
		var btnOk = $translate.instant('CANCEL_LESSONS');
		var btnCancel = $translate.instant('KEEP_SCHEDULE');

		var dialog = $mdDialog
			.confirm()
			.title(title)
			.content(content)
			.ariaLabel('Lessons cancellation')
			.ok(btnOk)
			.cancel(btnCancel);
		$mdDialog
			.show(dialog)
			.then(function() {
				console.log('Promise resolved');
			}, function() {
				console.log('Promise rejected');
			});
	};

});
