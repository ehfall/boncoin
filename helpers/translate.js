 
var Q = require('bluebird');

var services = {};
services.translate = translate;

module.exports = services;
  function translate(phrase){
  	var deffered = Q.defer();
    var  message  = i18n.__( {phrase: phrase, locale: global.defaultLocalelanguage} );
    deffered.resolve(message);


    return deffered.promise;
  }
  // end translate function helper