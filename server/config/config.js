require("dotenv").config();
const fs = require("fs");

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    // global-bundle.pem 연결
    // ssl: {
    //   ca: fs.readFileSync("./global-bundle.pem"),
    //   rejectUnauthorized: false,
    // },
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    // ssl: {
    //   ca: fs.readFileSync("./global-bundle.pem"),
    //   rejectUnauthorized: false,
    // },
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    // ssl: {
    //   ca: fs.readFileSync("./global-bundle.pem"),
    //   rejectUnauthorized: false,
    // },
  },
};
