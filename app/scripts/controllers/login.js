angular.module('NetPlanningApp').controller('LoginCtrl', function($location, DataService) {

	var vm = this;

	vm.username = 'R1225';
	vm.password = 'SXA112';

	vm.isLoading = false;

	vm.login = function() {
		vm.isLoading = true;
		DataService.login(vm.username, vm.password).then(function() {
			$location.url('/Today');
		}).catch(function(error) {
			// error occurred
		}).finally(function() {
			vm.isLoading = false;
		});
	};

});
