angular.module('mainApp',
	[
		//extern modules
		'ngResource',
		'angular-loading-bar',
		'ngAnimate',
		'i18n',
		'toaster',

		//directives
		'usersDirective',

		// rest api factories
		'categoryRest',
		
	])

.config(['i18nProvider',function(i18nProvider){

	i18nProvider.setObjectNotation( "→" );
}])

.controller('mainController',['$scope','i18n','Category','toaster',function($scope,i18n,Category,toaster){
	i18n.ensureLocaleIsLoaded().then( function() {
			    
	} );

	console.log( "Insured: " + i18n.__( "HOME" ) );
	Category.query(function(data) {
     toaster.pop('info', "categories list", "categories list available");
  });
			     
	}]);