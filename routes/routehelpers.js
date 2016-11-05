require('dotenv').config();

const Sequelize = require('sequelize');

const db = require('../db/schema').db;
const User = require('../db/schema').User;
const Sequence = require('../db/schema').Sequence;
const Sample = require('../db/schema').Sample;

module.exports = {
  newUser: function(req, res, next) {
    User.findOrCreate({ where: { name: req.session.passport.user.displayName, 
                                 email: req.session.passport.user.emails[0].value || req.session.passport.user.id } })
      .then(function(user) {
        req.session.userID = user[0].dataValues.id;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  terminateSession: function(req, res, next) {
    req.session.destroy();
    console.log('Checking if destroyed', req.session);
    next();
  }
};
