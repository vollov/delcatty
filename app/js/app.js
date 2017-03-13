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
	$urlRouterProvider.otherwise('home');
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
}])
.directive('tab', function(){
	return {
	    restrict: 'E',
	    transclude: true,
	    template: '<h2>Hello world in tab template!</h2> <div role="tabpanel" ng-transclude></div>',
	    require: '^tabset',
	    scope: {
	    	heading: '@'
	    },
	    link: function(scope, elem, attr, tabsetCtrl) {
	    	scope.active = false;
	    	tabsetCtrl.addTab(scope);
	    }
	  }
})
.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'views/tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this;
      self.tabs = [];
      
      self.addTab = function addTab(tab) {
    	  self.tabs.push(tab);
    	  if(self.tabs.length === 1) {
    		  tab.active = true;
    	  }
      };
      

	  self.select = function(selectedTab) {
		angular.forEach(self.tabs, function(tab) {
			if (tab.active && tab !== selectedTab) {
				tab.active = false;
			}
		})

		selectedTab.active = true;
	};
      
    }
  }
});