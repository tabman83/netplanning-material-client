angular.module('NetPlanningApp').controller('DayCtrl', function($scope, $localStorage) {
	'use strict';

	var vm = this;

	vm.selectedCount = 0;

	var itemsSelection = function() {
		return $localStorage.items.map(function(item) {
			return item.isSelected;
		});
	};

	var itemsSelectionWatcher = $scope.$watch(itemsSelection, function(val) {
		vm.selectedCount = val.filter(function(isItemSelected) {
			return isItemSelected;
		}).length;
	}, true);

	$scope.$on('$destroy', function() {
		itemsSelectionWatcher();
	});

});
