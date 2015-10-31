angular.module('NetPlanningApp').filter('showOnlyLessons', function() {
	return function(input, showOnlyLessons) {
		return input.filter(function(item) {
			return showOnlyLessons ? item.type === 0 : true;
		});
	}
});
