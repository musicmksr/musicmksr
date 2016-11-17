require('dotenv').config();

const Sequelize = require('sequelize');

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

// users to log in
const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING, // facebook name
  email: Sequelize.STRING // facebook email or id
});

// sequences of matrix to store
const Sequence = db.define('sequence', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  matrix: Sequelize.TEXT
});

// samples to be played for each track in matrix
const Sample = db.define('sample', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  hash: Sequelize.STRING
});

User.hasMany(Sequence);
Sequence.belongsTo(User);

User.hasMany(Sample);
Sample.belongsTo(User);

//Create Tables
db
  .sync({
    force: false,
  })
  .then(function() {
    console.log('Tables created');
});

module.exports = {
  User: User,
  Sequence: Sequence,
  Sample: Sample,
  db: db
};
