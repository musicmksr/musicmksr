require('dotenv').config({path: __dirname + '/../.env'});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '138.68.53.127',
  user     : process.env.NAME,
  password : process.env.PASS,
  port		 : '3306',
  socketPath: 'mysql-socket-path',
  database : process.env.DB_DB
});

connection.connect();

// const Sequelize = require('sequelize');

// // set up the database config
// var db = new Sequelize(process.env.DB_DB, process.env.NAME, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });

// // access the databse
// db
//   .authenticate()
//   .then(function (err) {
//     console.log('Connection established');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect: ', err);
//   });