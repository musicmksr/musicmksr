require('dotenv').config();

const Sequelize = require('sequelize');

const User = require('../db/schema').User;
const Sequence = require('../db/schema').Sequence;
const Sample = require('../db/schema').Sample;

// set up the database config
const db = new Sequelize(process.env.DB_DB, process.env.DB_NAME, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// access the databse
db
  .authenticate()
  .then(function (err) {
    console.log('Connection established');
  })
  .catch(function (err) {
    console.log('Unable to connect: ', err);
  });

module.exports = {
  newUser: function(req, res, next) {
    console.log('inside newUser', req.session.passport.user);
      User.findOrCreate({ where: { name: req.session.passport.user.displayName, 
                                   email: req.session.passport.user.emails[0] } })
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
