angular.module('NetPlanningApp').controller('LoginCtrl', function($location, DataService) {
	'use strict';
	
	var vm = this;

	vm.username = '';
	vm.password = '';
	vm.errorMessage = null;
	vm.isLoading = false;

	vm.login = function() {
		vm.isLoading = true;
		vm.errorMessage = null;
		DataService.login(vm.username, vm.password).success(function() {
			$location.url('/Today');
		}).error(function(error) {
			vm.errorMessage = error ? error.message : 'Network error.';
			vm.username = '';
			vm.password = '';
		}).finally(function() {
			vm.isLoading = false;
		});
	};

});
