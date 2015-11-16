angular.module('NetPlanningApp').filter('itemsAdded', function() {
	'use strict';
	return function(input) {
		return input.filter(function(item) {
			return item.isItemNew;
		});
	};
});
