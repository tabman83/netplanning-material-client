angular.module('NetPlanningApp').controller('LoginCtrl', function($location, DataService) {

	var vm = this;

	vm.username = 'R1225';
	vm.password = 'SXA112';
	vm.errorMessage = 'Network error.';
	vm.isLoading = false;

	vm.login = function() {
		vm.isLoading = true;
		vm.errorMessage = null;
		DataService.login(vm.username, vm.password).success(function() {
			$location.url('/Today');
		}).error(function(error) {
			// error occurred
			vm.errorMessage = error ? error.message : 'Network error.';
		}).finally(function() {
			vm.isLoading = false;
		});
	};

});
