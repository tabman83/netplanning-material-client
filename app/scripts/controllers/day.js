angular.module('NetPlanningApp').controller('DayCtrl', function($scope, $localStorage, $mdDialog, $translate) {
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

	vm.cancelSelection = function() {
		angular.forEach($localStorage.items, function(item) {
			item.isSelected = false;
		});
	};

	vm.cancelLessons = function() {
		var numLessons = $localStorage.items.filter(function(item) {
			return item.isSelected;
		}).length;

		var title = $translate.instant('LESSONS_CANCELLATION').capitalize();
		var content = $translate.instant('YOU_ARE_ABOUT_TO_CANCEL', { num: numLessons }).capitalize() + '.';
		var btnOk = $translate.instant('CONFIRM');
		var btnCancel = $translate.instant('BACK');

		var dialog = $mdDialog
			.confirm()
			.title(title)
			.textContent(content)
			.ariaLabel('Lessons cancellation')
			.ok(btnOk)
			.cancel(btnCancel);
		$mdDialog
			.show(dialog)
			.then(function() {
				console.log('Promise resolved');
			}, function() {
				console.log('Promise rejected');
			});
	};

	$scope.$on('$destroy', function() {
		itemsSelectionWatcher();
	});

});
