angular.module('app.controller',['app.services'])
.controller('AppCtrl', function($scope, $http) {

	$scope.filter = '';

	$scope.displayError = true;
	$scope.name = true;
	$scope.upArrow = true;
	$scope.downArrow = true;

	$scope.etsyList = [];
	$scope.changedEtsyList = [];

	// Making a get request to the server and sorting the initial response
	var promise = $http.get('https://openapi.etsy.com/v2/listings/active?api_key=h8j9dyb2o7svig1x13pjxtj7')
	.success(function(response) {
	// Successfully received a response from the server
		$scope.etsyList = _.sortBy(response, function(element){
			return element.name;
		});
		$scope.changedEtsyList = $scope.stateList
	})

	.error(function(err) {
	// Got an error back from the server
		$scope.displayError = false;
		$scope.error = err;

	})

	$scope.onClick = function() {
		if($scope.name) {
			$scope.changedEtsyList = $scope.changedEtsyList.reverse();
			$scope.name = false;
			$scope.upArrow = false;
			$scope.downArrow = false;
		} else {
			$scope.changedEtsyList = $scope.changedEtsyList.reverse();
			$scope.name = true;
			$scope.upArrow = true;
			$scope.downArrow = true;
		}
	}

	$scope.$watch('filter', function() {
		$scope.changedEtsyList = _.filter($scope.etsyList, function(element){
			var name = element.name.toLowerCase().indexOf($scope.filter.toLowerCase());
			var abbreviation = element.abbreviation.toLowerCase().indexOf($scope.filter.toLowerCase());
			return name >= 0 || abbreviation >= 0;
		});
	});

});