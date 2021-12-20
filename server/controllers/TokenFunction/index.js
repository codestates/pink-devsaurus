require('dotenv').config();
const { sign,verify } = require('jsonwebtoken')

module.exports = {
    // create AccessToken
    genarateAccessToken : (data) => {
        return sign(data, process.env.ACCESS_SECRET, {expiresIn:"1h"});
    },
    sendAccessToken : (code, res, accessToken ,result) => {
        res.status(code)
        .cookie('pinkcookie',accessToken,{ httpOnly:true, secure:true, sameSite:'None' })
        .json({result})
    },
}