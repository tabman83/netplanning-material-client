angular.module('NetPlanningApp').filter('itemsInTheAfternoon', function(moment) {
	'use strict';
	return function(input) {
		return input.filter(function(item) {
			return moment(item.date).format('A') === 'PM';
		});
	};
});
