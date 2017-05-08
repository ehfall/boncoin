var User = require('../models/user');
var Q = require('bluebird');

var services = {};
services.create = create;
services.findByUsernameAndPassword = findByUsernameAndPassword;

services.findAll = findAll;
module.exports = services;

function findAll(){

	var deffered = Q.defer();
	User.find({},function(error,users){
		if(error){deffered.reject(error);}
		if(users){deffered.resolve(users);}

	 });
	return deffered.promise;
}

function create(userParam) {

	var deffered = Q.defer();
	var userData = {'local.username' : userParam.username,'local.email':userParam.email};
	var user = new User(userData);
	user.save(function(error,newUser){

		if(error){deffered.reject(error);}
		if(newUser){deffered.resolve(newUser);}

	});
	return deffered.promise;

}

function findByUsernameAndPassword(username,password){
	var deffered = Q.defer();

	User.findOne({$or : [{'local.email' : username }, {'local.username' : username }]},function(user,error){
		if(error){deffered.reject(error.name +" : "+error.message);}
		if(user){deffered.resolve(user);}
	});
	return deffered.promise;


}