'use strict';

const Sequelize = require('sequelize');

const express = require('express');
const routes = require('../../routes/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

routes(app);

const { db } = require('../../db/schema');

beforeAll(function(done) {
  setTimeout(function() {
    done();
  }, 4500);
});

// const db = new Sequelize('music', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });

// beforeAll(function(done) {
// 	this.db = db
// 	  .authenticate()
// 	  .then(function (err) {
// 	    console.log('Connection established jasmine');
// 	    done();
// 	  })
// 	  .catch(function (err) {
// 	    console.error.bind(console, 'Sequelize connection error: ');
// 	  });
// });

beforeEach(function () {
	this.app = app;
  this.db = db;
});
