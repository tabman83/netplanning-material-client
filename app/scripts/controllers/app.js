angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav) {

	this.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	// 0 available
	// 1 available by me
	// 2 recurrent lesson
	// 3 1-time lesson
    this.items = [{
        name: 'Jubon Aurelie',
		type: 2,
        date: new Date(2015, 10, 2, 10, 30),
		isSelected: false
  	}, {
		type: 0,
        date: new Date(2015, 10, 2, 11, 00),
		isSelected: false
  	}, {
        name: 'Castro Maurice',
		type: 2,
        date: new Date(2015, 10, 2, 11, 30),
		isSelected: false
  	}, {
        name: 'Lijion Miriam',
		type: 3,
        date: new Date(2015, 10, 2, 12, 00),
		isSelected: false
  	}, {
		type: 0,
        date: new Date(2015, 10, 2, 12, 30),
		isSelected: false
  	}, {
        name: 'Oboez Marc',
		type: 3,
        date: new Date(2015, 10, 2, 13, 00),
		isSelected: false
  	}, {
        name: 'Ducette Ivette',
		type: 2,
        date: new Date(2015, 10, 2, 13, 30),
		isSelected: false
  	}, {
        name: 'Devrais Aloise',
		type: 3,
        date: new Date(2015, 10, 2, 15, 00),
		isSelected: false
  	}, {
		type: 1,
        date: new Date(2015, 10, 2, 16, 00),
		isSelected: false
  	}, {
		type: 1,
        date: new Date(2015, 10, 2, 16, 30),
		isSelected: false
  	}];

});
