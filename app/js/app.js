'use strict';

angular.module('demoApp', ['ui.router'])
.config(['$stateProvider','$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('home',{
		
		url : '/home',
		templateUrl : 'views/home.html',
	})
	.state('home.moen',{
		
		url : '/home/moen',
		templateUrl : 'views/moen.html',
	})
	.state('home.mansfield',{
		
		url : '/home/mansfield',
		templateUrl : 'views/mansfield.html',
	})
	.state('rules',{
		
		url : '/about',
		templateUrl : 'views/about.html'
	});
	
	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('home');
}]);