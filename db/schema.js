require('dotenv').config();

const Sequelize = require('sequelize');

// set up the database config
var db = new Sequelize(process.env.DB_DB, process.env.DB_NAME, process.env.DB_PASS, {
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