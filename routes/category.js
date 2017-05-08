var express = require('express');
var router = express.Router();
var _ = require('lodash');
var categoryService = require('../services/category.service');
/* GET users listing. */

router.post('/',function(req,res,next){

	var data = req.body;
	delete req.body;
	categoryService.create({data}).then(function(result){
		res.status(200).send(result);}
	,function(error){
		res.status(500).send(error);
	});

});
router.get('/', function(req, res, next) {
 	categoryService.read().then(function(results){
 		//res.send(results);
 		res.status(200).json(results);
 	},function(error){
 		 res.status(500).json(error);
 	});
});

router.put('/:id', function(req, res, next) {
 
});

router.delete('/:id',function(req,res,next){

});

module.exports = router;