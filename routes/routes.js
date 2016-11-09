const passport = require('passport');
const helpers = require('./routehelpers');

module.exports = function(app) {

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

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

  app.get('/api/sample/:songTitle', helpers.getSong);

  app.get('/api/session', helpers.getUserSession);

  app.get('/api/profile', helpers.getUserProfile);

  app.post('/api/save', helpers.saveSequence);
  
};
