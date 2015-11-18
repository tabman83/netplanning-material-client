angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav, $mdDialog, $mdToast, $scope, $location, $localStorage, $translate, amMoment, settings, DataService) {
	'use strict';

	var vm = this;

	vm.$storage = $localStorage;
	vm.DataService = DataService;

	vm.username = '';
	vm.password = '';
	vm.errorMessage = null;

	vm.$localStorage = $localStorage;
	vm.availableLanguages = {
		'en': 'English',
		'it': 'Italiano',
		'fr': 'French'
	};


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
		DataService.loadData(true).catch(function() {
			$mdToast.show({
				templateUrl: 'partials/toast-error.html',
				position: 'top right',
				hideDelay: 800
			});
		});
	};

	vm.login = function() {
		vm.errorMessage = null;
		DataService.login(vm.username, vm.password).then(function() {
			DataService.loadData(false);
		}).catch(function(reason) {
			vm.errorMessage = reason.status > -1 ? reason.data.message : $translate.instant('NETWORK_ERROR');
		}).finally(function() {
			vm.username = '';
			vm.password = '';
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
			.then(DataService.logout);
	};

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

});
