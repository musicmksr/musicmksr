const passport = require('passport');

modlue.exports.router = function(app) {

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){
    //
  });

}