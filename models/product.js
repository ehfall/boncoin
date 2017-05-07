var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ProductSchema= new Schema({

  title:{type:String},
  name : {type: String},
  description : {type:String},
  author:{type: Schema.ObjectId, ref: 'member'},
  category:{type: Schema.ObjectId, ref: 'category'},
  created_at: {type:Date, default: Date.now},
  updated_at: {type:Date}
});






module.exports=mongoose.model('product',ProductSchema,'product');