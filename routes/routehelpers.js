require('dotenv').config();

console.log('inside routhelpers', process.env.NODE_ENV);

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = require('../db/schema').db;
const User = require('../db/schema').User;
const Sequence = require('../db/schema').Sequence;
const Sample = require('../db/schema').Sample;


module.exports = {
  newUser(req, res, next) {
    let emailOrId;

    if (!req.session.passport.user.emails) {
      emailOrId = req.session.passport.user.id;
    }else{
      emailOrId = req.session.passport.user.emails[0].value;
    }

    User.findOrCreate({ where: { name: req.session.passport.user.displayName, 
                                 email: emailOrId } })
      .then(function(user) {
        console.log(user[0].dataValues.id);
        req.session.userID = user[0].dataValues.id;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  terminateSession(req, res, next) {
    req.session.destroy();
    console.log('Checking if destroyed', req.session);
    next();
  },

  setCookie(req, res, next) {
    req.session.cookie.passport = req.session.passport;
    next();
  },

  setUserId(req, res, next) {
    User.find({ where: { name: req.session.passport.user.displayName } })
      .then((user) => {
        req.session.cookie.passport.user.mainId = user.dataValues.id;
      })
      .then(() => {
        console.log('Current User:', req.session.cookie.passport.user);
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  loginRedirect(req, res, next) {
    console.log(`Login Action ${req.session}`);
    res.redirect('/');
  },
  
  setHeader(req, res, next) {
    res.setHeader('Set-Cookie', JSON.stringify(req.session.cookie.passport));
    next();
  },

  getSong(req, res, next) {
      const filePath = path.join(`${__dirname}/../samples/${req.params.songTitle}`);
      const fileInfo = req.params.songTitle.split('\.'); // grab the file extension for use in writeHead

      fs.stat(filePath, (err, stat) =>{
        if(err) {
          console.log(err);
        }

        res.writeHead(200, {
          'Content-Type': `audio/${fileInfo[1]}`,
          'Content-Length': stat.size
        });

        const rs = fs.createReadStream(filePath);

        rs.pipe(res);
      });
  },

  getUserSession(req, res, next) {
    res.send(req.session);
  },

  getUserProfile(req, res, next) {
    Sequence.findAll({where: { userId: req.params.userId }})
      .then((sequences) =>{
        Sample.findAll({where: { userId: { $or: [req.params.userId, null] } } })
          .then((samples) =>{
            res.send({sequences: sequences, samples: samples});
          });
      })
      .catch((err) =>{
        console.log(err);
      });
  },

  saveSequence(req, res, next) {
    const sequence = JSON.stringify(req.body.sequence);
    const title = req.body.title;
    Sequence.find({where: { name: title }})
      .then((foundItem) =>{
        console.log(foundItem)
        if(!foundItem){
          // create
          Sequence.create({name: title, matrix: sequence, userId: req.session.passport.user.mainId})
            .then((response) =>{
              res.send('Saved');
            })
            .catch((err) => {
              console.log(err);
            });
        }else{
          foundItem.updateAttributes({ matrix: sequence })
            .then((response) =>{
              res.send('Successful Update');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

};
