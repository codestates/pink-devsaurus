require('dotenv').config();

const mysql = require('mysql2');
const fs = require('fs');

const pool = mysql.createPool({
    // ssl: {
    //     ca : fs.readFileSync('./global-bundle.pem')
    // },
    host: `${process.env.DATABASE_HOST}`,
    user: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    port: `${process.env.DATABASE_PORT}`,
    database: `${process.env.DATABASE_NAME}`,
    connectionLimit: 10,
    multipleStatements: true
})

module.exports = pool;