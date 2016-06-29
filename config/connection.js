// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************
//
// Dependencies
// var Sequelize = require("sequelize");

// Lists out connection options
var source = {

    localhost: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: "mf4711MF",
        database: "my_schema"
    },
//after we deploy to heroku and add the jawsDB then we can add the missing data here:
    jawsDB: {
        port: 3306,
        host     : 'q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user     : 'xuo8t6hi3fcmh6hz',  
        password : 'r9iionzy6ttm6hib',
        database : 'qu6ai46bjrkxx06l'
    }
}

// Selects a connection (can be changed quickly as needed)
var selectedSource = source.jawsDB;

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