var express = require('express');
var router = express.Router();
var _ = require('lodash');
var userService = require('../services/user.service');
/* GET users listing. */
router.get('/', function(req, res, next) {

 userService.findAll().then(function(data){
 	if(data){
 		 
 		data  = JSON.stringify(data);
 		res.render('users', { title: 'Users' ,users:data,keywords : 'users list',description:'users description'});
 	}
 });

});

module.exports = router;
