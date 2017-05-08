angular.module('categoryRest',[])
	.factory('Category',['$resource',function($resource){



		 return $resource('/api/categories/:id', { id: '@_id' }, {
				    update: {
				      method: 'PUT' // this method issues a PUT request
				    }
  			}
  			);
	}]);