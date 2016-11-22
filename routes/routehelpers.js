const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
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

  setHeader(req, res, next) {
    res.setHeader('Set-Cookie', JSON.stringify(req.session.cookie.passport));
    next();
  },

  loginRedirect(req, res, next) {
    console.log(`Login Action ${req.session}`);
    res.redirect('/');
  },

  isLoggedIn(req, res, next) {
    if(req.session.passport !== undefined){
      if(req.session.passport.user.displayName && req.session.passport.user.provider === 'facebook'){
        next();
      }else{
        res.status(401).send({ error: 'Error authenticating' });
      }
    }else{
      res.status(400).send({ error: 'Not Logged In' });
    }
  },

  getSong(req, res, next) {

      const fileInfo = req.params.songTitle.split('\.'); // grab the file extension for use in writeHead

      Sample.find({where: {name: fileInfo[0] }})
        .then((response) =>{
          if(response !== null){
            const sampleHash = response.dataValues.hash;

            return sampleHash;
          }else {
            throw new Error();
          }
        })
        .then((sampleHash) =>{
          const filePath = path.join(`${__dirname}/../samples/${sampleHash}.wav`);

          fs.stat(filePath, (err, stat) =>{
            if(err) {
              console.log(err);
              res.status(400).send({ error: err });
            }

            res.writeHead(200, {
              'Content-Type': `audio/${fileInfo[1]}`,
              'Content-Length': stat.size
            });

            const rs = fs.createReadStream(filePath);

            rs.pipe(res);
          });
        })
        .catch((err) =>{
          console.log(err);
          res.status(400).send({ error: 'File Not Found' });
        });
  },

  getSampleOptions(req, res, next) {
    module.exports.getUserSamples(req.params.userId, (samples) =>{
      res.send({samples: samples});
    });
  },

  getUserSession(req, res, next) {
    res.send(req.session);
  },

  getUserProfile(req, res, next) {
    Sequence.findAll({where: { userId: req.params.userId }})
      .then((sequences) =>{
        if(sequences !== null){
          module.exports.getUserSamples(req.params.userId, (samples) =>{
            res.send({sequences: sequences, samples: samples});
          });
        }else {
          res.status(401).send({ error: 'Not Found' });
        }
      })
      .catch((err) =>{
        console.log(err);
        res.status(400).send({ error: err });
      });
  },

  saveSequence(req, res, next) {
    const sequence = JSON.stringify(req.body.sequence);
    let title = req.body.title;

    title = title.replace(/<script.*>.*<\/script>/g, " ");
    title = title.trim();

    Sequence.find({where: { name: title, userId: req.body.userId }})
      .then((foundItem) =>{
        if(!foundItem){
          // create
          Sequence.create({name: title, matrix: sequence, userId: req.body.userId})
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
  },

  deleteSequence(req, res, next) {
    Sequence.destroy({where: { name: req.params.sequenceName, userId: req.params.userId}})
      .then((response) =>{
        console.log('delete track ', response)
        res.end();
      })
      .catch((err) =>{
        console.log(err);
        res.status(400).send({ error: 'Sequence Could Not Be Deleted' });
      });
  },

  getUserSamples(userId, cb) {
    Sample.findAll({where: { userId: { $or: [userId, null] } } })
      .then((samples) =>{
        if(samples !== null){
          if(cb) cb(samples);
        }else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ error: 'Sample Not Found' });
      });
  },

  uploadAudio(req, res, next) {
    let fileName = req.body.name.replace(/(\.wav|\.mp3|\.ogg)/g, '');
    fileName = fileName.replace(/<script.*>.*<\/script>/g, " ");
    fileName = fileName.trim();

    const fileNameHash = sha1(`${fileName}${req.body.id}`);

    Sample.create({name: fileName, hash: fileNameHash, userId: req.body.id})
      .then((response) =>{
        if(response){
          fs.writeFile(`${__dirname}/../samples/${fileNameHash}.wav`, req.file.buffer, (err) =>{
            if(err) {
              throw err;
            }else{
              res.send('refresh');
            }
          });
        }
      })
      .catch((err) =>{
        console.log(err);
      });  
  }

};
