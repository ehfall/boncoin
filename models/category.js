var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var CategorySchema= new Schema({

  name:{type:String},
  description : {type:String},
  author:{type: Schema.ObjectId, ref: 'member'},
  created_at: {type:Date, default: Date.now},
  updated_at: {type:Date}
});






module.exports=mongoose.model('category',CategorySchema,'category');