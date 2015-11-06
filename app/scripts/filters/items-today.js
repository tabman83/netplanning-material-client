angular.module('NetPlanningApp').filter('itemsToday', function() {
	return function(input) {
		var now = moment();
		return input.filter(function(item) {
			return now.isSame(item.date, 'day');
		});
	}
});
