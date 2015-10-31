angular.module('NetPlanningApp').filter('itemsInTheAfternoon', function() {
	return function(input) {
		return input.filter(function(item) {
			return moment(item.date).format('A') === 'PM';
		});
	}
});
