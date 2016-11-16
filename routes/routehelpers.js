require('dotenv').config();

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

  setHeader(req, res, next) {
    res.setHeader('Set-Cookie', JSON.stringify(req.session.cookie.passport));
    next();
  },

  loginRedirect(req, res, next) {
    console.log(`Login Action ${req.session}`);
    res.redirect('/');
  },

  isLoggedIn(req, res, next) {
    if(req.session.passport.user.displayName && req.session.passport.user.provider === 'facebook'){
      next();
    }else{
      res.end('failed');
    }
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
        module.exports.getUserSamples(req.params.userId, (samples) =>{
          res.send({sequences: sequences, samples: samples});
        });
      })
      .catch((err) =>{
        console.log(err);
      });
  },

  saveSequence(req, res, next) {
    const sequence = JSON.stringify(req.body.sequence);
    let title = req.body.title;

    title = title.replace(/<script.*>.*<\/script>/g, " ");
    title = title.trim();

    Sequence.find({where: { name: title, userId: req.body.userId }})
      .then((foundItem) =>{
        console.log(foundItem)
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
        res.end();
      })
      .catch((err) =>{
        console.log(err);
      });
  },

  getUserSamples(userId, cb) {
    Sample.findAll({where: { userId: { $or: [userId, null] } } })
      .then((samples) =>{
        if(cb) cb(samples);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  mergeBuffers(channelBuffer, recordingLength){
    let result = new Float32Array(recordingLength);
    let offset = 0;
    let lng = recordingLength;
    console.log(lng)
    for (let i = 0; i < lng; i++){
      let buffer = channelBuffer[i];
      result.set([buffer], offset);
      offset += buffer.length;
    }
    return result;
  },
  // everything bellow has to do with uploading audio
  interleave(leftChannel, rightChannel){
    let length = leftChannel.length + rightChannel.length;
    let result = new Float32Array(length);
   
    let inputIndex = 0;
   
    for (let index = 0; index < length; ){
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  },

  writeUTFBytes(view, offset, string){ 
    let lng = string.length;
    for (let i = 0; i < lng; i++){
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  },

  uploadAudio(req, res, next) {
    console.log(req.body.blob)
    // let leftArr = Object.keys(req.body.wave1).map(function (key) { return req.body.wave1[key]; });
    // let rightArr = Object.keys(req.body.wave2).map(function (key) { return req.body.wave2[key]; });
    // let leftAudio = req.body.wave1;
    // let rightAudio = req.body.wave2;

    // let leftBuffer = module.exports.mergeBuffers ( leftAudio, leftArr.length );
    // let rightBuffer = module.exports.mergeBuffers ( rightAudio, rightArr.length );
    // // we interleave both channels together
    // let interleaved = module.exports.interleave ( leftBuffer, rightBuffer );
     
    // // create the buffer and view to create the .WAV file
    // let buffer = new ArrayBuffer(44 + interleaved.length * 2);
    // let view = new DataView(buffer);
     
    // // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
    // // RIFF chunk descriptor
    // module.exports.writeUTFBytes(view, 0, 'RIFF');
    // view.setUint32(4, 44 + interleaved.length * 2, true);
    // module.exports.writeUTFBytes(view, 8, 'WAVE');
    // // FMT sub-chunk
    // module.exports.writeUTFBytes(view, 12, 'fmt ');
    // view.setUint32(16, 16, true);
    // view.setUint16(20, 1, true);
    // // stereo (2 channels)
    // view.setUint16(22, 2, true);
    // view.setUint32(24, 44100, true);
    // view.setUint32(28, 44100 * 4, true);
    // view.setUint16(32, 4, true);
    // view.setUint16(34, 16, true);
    // // data sub-chunk
    // module.exports.writeUTFBytes(view, 36, 'data');
    // view.setUint32(40, interleaved.length * 2, true);
     
    // // write the PCM samples
    // let lng = interleaved.length;
    // let index = 44;
    // let volume = 1;
    // for (let i = 0; i < lng; i++){
    //     view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
    //     index += 2;
    // }

    // console.log(view)

    // our final binary blob that we can hand off
    // let blob = new Blob( [ view ], { type : 'audio/wav' } );
      
    // console.log(blob)
  }

};
