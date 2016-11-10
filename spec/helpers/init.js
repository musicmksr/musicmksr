'use strict';

require('dotenv').config();
const Sequelize = require('sequelize');

const app = require('../../server');

const db = new Sequelize('music', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

beforeAll(function(done) {
	this.db = db
	  .authenticate()
	  .then(function (err) {
	    console.log('Connection established jasmine');
	    done();
	  })
	  .catch(function (err) {
	    console.error.bind(console, 'Sequelize connection error: ')
	  });
});

beforeEach(function () {
	this.app = app;
});

afterEach(function (done) {
	db.close();
	done();
});