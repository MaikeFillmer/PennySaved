// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************
//
// Dependencies
// var Sequelize = require("sequelize");

// Lists out connection options
var config = require('./config.js');
var source =  config

// Selects a connection (can be changed quickly as needed)
var selectedSource = source.source;

// Creates mySQL connection using Sequelize
// var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
//   host: selectedSource.host,
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },

// });

// // Exports the connection for other files to use
// module.exports = sequelize;