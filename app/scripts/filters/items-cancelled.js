angular.module('NetPlanningApp').filter('itemsCancelled', function() {
	'use strict';
	return function(input) {
		return input.filter(function(item) {
			return item.type === 0;
		});
	};
});
