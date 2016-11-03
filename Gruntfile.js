const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    webpack: {
      someName: {
        // webpack options 
        entry: APP_DIR + '/Routes.jsx',
        output: {
          path: BUILD_DIR,
          filename: 'bundle.js'
        },

        module: {
          loaders : [
            {
              test : /\.jsx?/,
              include : APP_DIR,
              loader : 'babel'
            }
          ]
        },
     
        stats: {
            // Configure the console output 
            colors: true,
            modules: true,
            reasons: true
        },
        // stats: false disables the stats output 
     
        storeStatsTo: "xyz", // writes the status to a variable named xyz 
        // you may use it later in grunt i.e. <%= xyz.hash %> 
     
        progress: true, // Don't show progress 
        // Defaults to true 
     
        failOnError: false, // don't report error to grunt if webpack find errors 
        // Use this if webpack errors are tolerable and grunt should continue 
     
        watch: true, // use webpacks watcher 
        // You need to keep the grunt process alive 
     
        watchOptions: {
            aggregateTimeout: 500,
            poll: true
        },
        // Use this when you need to fallback to poll based watching (webpack 1.9.1+ only) 
     
        keepalive: true, // don't finish the grunt task 
        // Use this in combination with the watch option 
      }
    },

    watch: {
      scripts: {
        files: [
          'src/client/app/*.jsx',
          'src/client/public/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'src/client/public/*.css',
        tasks: ['cssmin']
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'build',
    'start'
  ]);

  grunt.registerTask('start', [
    'nodemon'
  ]);


};