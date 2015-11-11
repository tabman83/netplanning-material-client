angular.module('NetPlanningApp').controller('SettingsCtrl', function($localStorage) {
	'use strict';

	var vm = this;

	vm.$localStorage = $localStorage;	
	vm.availableLanguages = {
		'en': 'English',
		'it': 'Italiano'
	};
});
