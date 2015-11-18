angular.module('NetPlanningApp').directive('netplanningItem', function() {
	'use strict';
	return {
        replace: true,
        restrict: 'E',
        templateUrl: function (element, attrs) {
            return attrs.src;
        }
    };
});
