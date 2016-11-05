'use strict';

require('dotenv').config();
const Sequelize = require('sequelize');

const app = require('../../server');

const db = new Sequelize(process.env.DB_DB, process.env.DB_NAME, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

beforeAll(function(done) {
	this.db = db.authenticate();

	this.db.on('error', console.error.bind(console, 'Sequelize connection error: '));
	this.db.once('open', () =>{
		console.log('Database Connection');
		done();
	});
});

beforeEach(function () {
	this.app = app;
});

afterEach(function (done) {
	db.close(() =>{
		done();
	});
});
