var express = require('express');
// var minify = require('express-minify');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var _ = require('lodash');
var expressValidator = require('express-validator');
//var flash =  require('connect-flash');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
var ejsMate = require('ejs-mate');
var config = require('./config/config');
var database = require('./config/database');
var i18n = require( "i18n" );
var i18nRoutes = require( "i18n-node-angular" );
global.applicationRoot = path.resolve(__dirname);
global.defaultLocalelanguage = 'fr';

var MemoryStore = require('session-memory-store')(session);
var compression = require('compression');
var app = express();
var staticAsset = require('static-asset');
var async = require('async');
var index = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
global.currentEnv=app.get('env');

app.use(compression());

// app.use(minify());
// app.use(minify({cache: __dirname + '/cache'}));
//socket io
app.io = require('socket.io')();



// mongodb connection

mongoose.connect(database.url,function(err){
  if(err){
      console.log("database error : "+err);
  }else{
        console.log("connected successfully to the database  and env is:"+app.get('env'));
  }

});
// end connection mongodb
// app.set('port', process.env.PORT || 3000);

// view engine setup
app.engine('ejs',ejsMate);
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.set('view cache', true);

app.use(cookieParser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handle express session
// app.use(session({secret:'hoochiecoochieman',saveUninitialized:true, resave:true}));
app.use(session({
  name: 'JSESSION',
  secret:'hoochiecoochieman',
  saveUninitialized:true,
  resave:true,
  store:new MemoryStore({expires:10 * 60 * 12,checkperiod:10 * 60})
})
);



// handle passport
app.use(passport.initialize());
app.use(passport.session());



//i18n config



app.use( i18n.init );
app.use( i18nRoutes.getLocale );



i18n.configure({
    locales:['fr', 'en'],
    directory: __dirname + '/locales',
    cookie: 'i18n',
    // defaultLocale: global.defaultLocalelanguage ,
    objectNotation : "→",

});

// app.use( function( req, res, next ) {

  // res.locals.preferedLanguage = 'fr';
  // res.locals.acceptedLanguage = function() {
  //   return i18n.getLocale.apply( req, arguments );
  // };
//   next();
// } );
// avoid set headers
app.use(function(req,res,next){
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});
// aend void set headers

 app.get( "/i18n/:locale",function( req, res )
  {
    var locale = req.params.locale;

  res.sendFile( __dirname+"/locales/" + locale + ".json" );
});
app.get('/i18n/:locale/:phrase', function( req, res ) {

  var locale = req.params.locale;
  var phrase = req.params.phrase;
  var result = i18n.__( {phrase: phrase, locale: locale} );


  res.send( result );

});

//end i18n config

//change language
app.get('/language/:lang',function(req,res,next){
  var locale = req.params.lang;
  global.defaultLocalelanguage  = locale;
  res.redirect('back');

});
// end of change locale
//end change language
// express-validator conf
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.');
        var root    = namespace.shift();
        var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}
));
 

//app.use(staticAsset(__dirname + "/public/") );
app.use(express.static(__dirname + "/public/") );

app.use(flash());

app.use(function (req,res,next) {

    res.locals.user = req.session.user;
    var err = req.flash('error');
    res.locals.error = err.length ? err: null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;

    var warning = req.flash('warning');
    res.locals.warning = warning.length ? warning : null;

    var info = req.flash('info');
    res.locals.info = info.length ? info : null;
    next();
});



// require('./routes/routes.js')(app, passport,i18n);
app.use('/',index);
app.use('/users',users);
app.use('/api/categories',category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.render('error',{title:'error',keywords:'errors',description:'error description'});
});




module.exports = app;