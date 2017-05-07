module.exports={

  "port":process.env.PORT||3000,
  "database":"mongodb://diarabi.scalingo.io:27017/boncoin",
 

"secretKey": "mbolosecretpossee",
  "smtpTransport":{
    "service": "Gmail",
    "auth": {
      "user": 'uuu',
      "pass": 'uuu'
    }
  },
  "facebookAuth":{
    "clientId":"660967424106125",
    "clientSecret":"3f9135d3b75536ab648158c07c8a495d",
    //"callbackUrl":"https://tafa.xervo.bz/auth/facebook/callback",
     //"callbackUrl":"http://diarabi.scalingo.io:3000/auth/facebook/callback"
    "callbackUrl":"https://diarabi2.scalingo.io/auth/facebook/callback"


  }

}