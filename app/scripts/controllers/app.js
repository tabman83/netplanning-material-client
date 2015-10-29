angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav){

	this.toggleSidenav = function(menuId) {
    	$mdSidenav(menuId).toggle();
	};

});
