const pool = require("../../DB/mysql");

module.exports = async (req,res) => {
    console.log('./controllers/session/logOut');

    res.status(201).cookie('pinkcookie', '' , {maxAge: 0}).end();
}