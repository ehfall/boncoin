var Category = require('../models/category');
var Q = require('bluebird');

var services = {};
services.create = create;
services.read = read;
services.update = update;
services.delete = _delete;
module.exports = services;





function create(data){

	var defer = Q.defer();
	var newCategory = Category(data);
	newCategory.save(function(error,savedCategory){

		if(error){defer.reject(error);}
		if(savedCategory){defer.resolve(savedCategory);}

	});

	return defer.promise;

}
function read(){
	var defer = Q.defer();
	 
	Category.find({},function(error,categories){
		if(error){defer.reject(error);}
		if(categories){defer.resolve(categories);}
	});

	return defer.promise;
	

}
function update(id){
	var defer = Q.defer();
	Category.findByIdAndUpdate(id,{new: true},function(error,result){
		if(error){defer.reject(error);}
		if(result){defer.resolve(result);}
	});
	return defer.promise;

}

function _delete(id){


	var defer = Q.defer();
	Category.findByIdAndRemove(id,function(error,categoryToDelete){
		if(error){defer.reject(error);}
		if(categoryToDelete){
			 defer.resolve(categoryToDelete);
		}

	});

	return defer.promise;

}