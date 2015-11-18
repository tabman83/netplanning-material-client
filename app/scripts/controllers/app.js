angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav, $mdDialog, $mdToast, $scope, $location, $localStorage, $translate, amMoment, settings, DataService) {
	'use strict';

	var vm = this;

	vm.$storage = $localStorage;
	vm.DataService = DataService;

	$localStorage.$default({
		language: settings.defaultLanguage
	});

	$scope.$watch(function() {
		return $localStorage.language;
	}, function(val) {
		$translate.use(val);
		amMoment.changeLocale(val);
	});

	vm.update = function() {
		var errorMessage = '<md-icon md-svg-src="images/ic_settings_48px.svg" class="md-warn" aria-label="settings"></md-icon>';
		errorMessage += $translate.instant('ERROR_LOADING_DATA');
		var a = DataService.loadData(true).catch(function() {
			$mdToast.show({
				templateUrl: 'partials/toast-error.html',
				position: 'top right',
				hideDelay: 800
			});
		});
	};

	vm.logout = function() {
		var title = $translate.instant('LOGOUT').capitalize();
		var content = $translate.instant('ARE_YOU_SURE_YOU_WANT_TO_LOGOUT').capitalize() + ' ?';
		var btnOk = $translate.instant('OK');
		var btnCancel = $translate.instant('CANCEL');

		var dialog = $mdDialog
			.confirm()
			.title(title)
			.textContent(content)
			.ariaLabel('Logout')
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
		var btnOk = $translate.instant('CONFIRM');
		var btnCancel = $translate.instant('BACK');

		var dialog = $mdDialog
			.confirm()
			.title(title)
			.textContent(content)
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
