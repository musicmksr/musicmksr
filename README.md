# Welcome to Steps 160

Welcome to steps 160, a personal sequencer for uploading samples and mixing beats. Check us out at [steps160.com](http://steps160.com/)!

# Meet The Team

![alt text](https://avatars2.githubusercontent.com/u/14987737?v=3&s=75) [Alex Ting](https://github.com/acting326)
![alt text](https://avatars3.githubusercontent.com/u/13542220?v=3&s=75>) [Andrew Sherman](https://github.com/ashermanwmf)
![alt text](https://avatars3.githubusercontent.com/u/19693600?v=3&s=75) [Chirs Doo](https://github.com/potatosfarmer)
![alt text](https://avatars2.githubusercontent.com/u/15621349?v=3&s=75) [Gery Egan](https://github.com/geryegan)

# Getting Started

If you would like to fork this repository, please follow these steps to set up your dev environment.

1. Make sure you are running Node version 6.5 and have MySQL installed
2. Work from the Dev2 branch on MusicMksr.
3. NPM install in the root directory.
4. Set up a .env file and add your local MySQL variables. Refer to db/schema.js where environment variables are being applied.
5. Add a NODE_DEV variable to your .env for port number.
6. Create a facebook app and add keys to a config.js file in the root directory

# Tech Stack

##Front End

* [React](https://facebook.github.io/react/)-[Redux](https://github.com/reactjs/redux): for rendering page views and maintaining state.
* [Howler](https://howlerjs.com/): reliable audio objects.
* [Plucked](https://github.com/plucked/html5-audio-editor): HTML5 audio editor and uploader.
* [Axios](https://github.com/mzabriskie/axios): ajax requests for API endpionts.
* [Bootstrap](http://getbootstrap.com/): a styling framework.

##Back End

* [Node.js](https://nodejs.org/en/) with [Express](http://expressjs.com/): for serving pages and handling api requests.
* [Multer](https://github.com/expressjs/multer): middleware for handling multipart/form-data.
* [MySQL](https://www.mysql.com/: relational database.
* [Sequelize](http://docs.sequelizejs.com/en/v3/): ORM for MySQL.

##Testing

* [Jamine](https://jasmine.github.io/): API endpoint testing.
* [Enzyme](https://github.com/airbnb/enzyme): for React component testing.

## Dev/Build Tools
* [Webpack](https://webpack.github.io/) for scaffolding and [Babel](https://babeljs.io/) for transpiling.
