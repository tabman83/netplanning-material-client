angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav) {

	this.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	// 0 lesson, 1 available
    this.items = [{
        name: 'Jubon Aurelie',
		type: 0,
        date: new Date(2015, 10, 2, 10, 30)
  	}, {
		type: 1,
        date: new Date(2015, 10, 2, 11, 00)
  	}, {
        name: 'Castro Maurice',
		type: 0,
        date: new Date(2015, 10, 2, 11, 30)
  	}, {
        name: 'Lijion Miriam',
		type: 0,
        date: new Date(2015, 10, 2, 12, 00)
  	}, {
		type: 1,
        date: new Date(2015, 10, 2, 12, 30)
  	}, {
        name: 'Oboez Marc',
		type: 0,
        date: new Date(2015, 10, 2, 13, 00)
  	}, {
        name: 'Ducette Ivette',
		type: 0,
        date: new Date(2015, 10, 2, 13, 30)
  	}, {
        name: 'Devrais Aloise',
		type: 0,
        date: new Date(2015, 10, 2, 15, 00)
  	}, {
		type: 1,
        date: new Date(2015, 10, 2, 16, 00)
  	}, {
		type: 1,
        date: new Date(2015, 10, 2, 16, 30)
  	}];

});
