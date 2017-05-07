var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');
var gravatar = require('gravatar');


var memberSchema = new Schema({
	 local            : {
        email        : String,
        username     : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    location:{

          ip: {type:String},
          country_code: {type:String},
          country_name: {type:String},
          region_code: {type:String},
          region_name: {type:String},
          city: {type:String},
          zip_code: {type:String},
          time_zone: {type:String},
          latitude: {type:String},
          longitude: {type:String},
          metro_code: {type:String}

        }


});
memberSchema.methods.generateHash = function(){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
memberSchema.methods.validPassword = function(password){

	return bcrypt.compareSync(password,this.local.password);

};
var User = module.exports = mongoose.model('member',memberSchema,'member');