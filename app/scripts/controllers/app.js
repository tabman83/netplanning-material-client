angular.module('NetPlanningApp').controller('AppCtrl', function($mdSidenav, $mdDialog, $scope, $localStorage, $translate, DataService) {

	var vm = this;


	vm.$storage = $localStorage.$default({
    	language: 'en'
	});
	$scope.$watch('$storage.language', function(val) {
		console.log(val);
	});
	vm.$storage = 'a';
	//$translate.use('en');


	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	vm.cancelSelection = function() {
		angular.forEach(DataService.items, function(item) {
			item.isSelected = false;
		});
	};

	vm.cancelLessons = function() {
		var numLessons = DataService.items.filter(function(item) {
			return item.isSelected;
		}).length;

		var title = $translate.instant('LESSONS_CANCELLATION');
		var content = $translate.instant('YOU_ARE_ABOUT_TO_CANCEL', { num: numLessons }) + '.';
		var btnOk = $translate.instant('CANCEL_LESSONS');
		var btnCancel = $translate.instant('KEEP_SCHEDULE');

		var dialog = $mdDialog
			.confirm()
			.title(title)
			.content(content)
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

	vm.items = DataService.items;
	vm.lastUpdate = DataService.lastUpdate;

});
