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
	.state('contacts',{
		url : '/contacts',
		templateUrl : 'views/contacts.html',
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
	})
	.state('product',{
		url : '/product',
		templateUrl : 'views/product.html'
	});

	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('home');
}])
.controller('ExampleController', ['$scope', function($scope) {
	$scope.title = 'Lorem Ipsum';
	$scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
}])
.directive('pane', function(){
	 return {
		 restrict: 'E',
		 transclude: true,
		 scope: { title:'@' },
		 templateUrl: 'views/component/trans.html'
	 };
})
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
	    template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
	    require: '^tabset',
	    scope: {
	    	heading: '@'
	    },
	    link: function(scope, elem, attr, tabsetCtrl) {
	    	scope.active = false;
//	    	scope.disabled = false;
//
//	    	if(attr.disable) {
//	    		  attr.$observe('disable', function(value) {
//	    		   scope.disabled = (value !== 'false')
//	    		  })
//	    	}

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
		  if(selectedTab.disabled) { return; }

		console.log('selected tab=%j', selectedTab.heading);
		angular.forEach(self.tabs, function(tab) {
			console.log('for tab=%j', tab.heading);

			if (tab.active && tab !== selectedTab) {
				console.log('other tab=%j', tab.heading);
				tab.active = false;
			}
		})

		selectedTab.active = true;
	};

    }
  }
});
