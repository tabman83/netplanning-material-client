angular.module('NetPlanningApp').filter('itemsTomorrow', function() {
	return function(input) {
		var now = moment().add(1, 'days');
		return input.filter(function(item) {
			return now.isSame(item.date, 'day');
		});
	}
});
