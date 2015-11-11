angular.module('NetPlanningApp').filter('itemsInTheMorning', function(moment) {
	'use strict';
	return function(input) {
		return input.filter(function(item) {
			return moment(item.date).format('A') === 'AM';
		});
	};
});
