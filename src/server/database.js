
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'web_db', 'root', '1234', {
        host: 'localhost', 
        dialect: 'mysql', 
        pool: {
            max: 5, 
            min: 0, 
            idle: 10000
        }
    }
)


// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'web_db',
//     port:3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

module.exports = {
    sequelize
};
