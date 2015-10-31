angular.module('NetPlanningApp').controller('TodayCtrl', function($scope) {

	this.isEditing = false;

	var itemsSelection = function() {
		return $scope.items.map(function(item) {
			return item.date;
		});
	};

	var itemsSelectionWatcher = $scope.$watch(itemsSelection, function(val) {
		console.log(val);
	});

	$scope.$on('$destroy', function() {
		itemsSelectionWatcher();
	});

});
