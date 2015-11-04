angular.module('NetPlanningApp').controller('SettingsCtrl', function($localStorage) {

	var vm = this;

	vm.$localStorage = $localStorage;
	
	vm.availableLanguages = {
		'en': 'English',
		'it': 'Italiano'
	};
});
