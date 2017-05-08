angular.module('usersDirective',[])
	.directive('allUsers',[function(){


	return{
      restrict:'EA',
      scope:{
       users:'='
     	},

      link: function(scope,element,attr){


      },
      templateUrl:'/angularjs/templates/allUsers.ejs',
      controller: function($scope){

         
      
        



      },// end of controller


    };
	}])