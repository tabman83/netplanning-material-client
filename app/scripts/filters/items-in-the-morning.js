angular.module('NetPlanningApp').filter('itemsInTheMorning', function() {
	return function(input) {
		return input.filter(function(item) {
			return moment(item.date).format('A') === 'AM';
		});
	}
});
