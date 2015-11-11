angular.module('NetPlanningApp').filter('showOnlyLessons', function() {
	'use strict';
	return function(input, showOnlyLessons) {
		return input.filter(function(item) {
			return showOnlyLessons ? item.isLesson : true;
		});
	};
});
