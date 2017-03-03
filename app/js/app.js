'use strict';

angular.module('demoApp', ['ui.router'])
.config(['$stateProvider','$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('home',{
		
		url : '/home',
		templateUrl : 'views/home.html',
		controller : 'HomeCtrl',
		controllerAs: 'vm',
		resolve: {
		    people:  ['$state', function($state) {
		      return console.log('resolve=>'+ $state.current.name);
		    }]
		}
	})
	.state('home.moen',{
		
		url : '/moen',
		templateUrl : 'views/home/moen.html',
		
		
		
	})
	.state('home.mansfield',{
		
		url : '/mansfield',
		templateUrl : 'views/home/mansfield.html',
	})
	.state('rules',{
		
		url : '/about',
		templateUrl : 'views/about.html'
	});
	
	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('home.moen');
}])
.controller('HomeCtrl', ['$state', function($state) {
	var vm=this;
	var init = function () {
		console.log('path=>'+ $state.current.name);
		console.log('people=>'+ vm.people);
		$state.go('home.moen');
	};
		// and fire it after definition
	init();
	

}]);