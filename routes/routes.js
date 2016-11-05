const passport = require('passport');
const helpers = require('./routehelpers');

module.exports = function(app) {

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    helpers.newUser,
    (req, res) => {
      res.redirect('/');
    }
    );

  app.get('/logout', helpers.terminateSession, (req, res) => {
    console.log('logging out', res.session);
    res.redirect('/');
  });

}
