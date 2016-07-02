  var configs = {
    jawsDB: {
        port: 3306,
        host     : process.env.HOST,
        user     : process.env.USER,  
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    }
}
module.exports = configs;
