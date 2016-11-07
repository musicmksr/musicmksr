const passport = require('passport');
const helpers = require('./routehelpers');

module.exports = function(app) {

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    helpers.newUser,
    helpers.setCookie,
    helpers.setUserId,
    helpers.setHeader,
    helpers.loginRedirect
  );

  app.get('/logout', 
    helpers.terminateSession, 
    helpers.loginRedirect
  );

  app.get('/api/song/:songTitle', helpers.getSong);
};
