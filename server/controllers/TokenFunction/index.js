require('dotenv').config();
const { sign,verify } = require('jsonwebtoken')

module.exports = {
    // create AccessToken
    genarateAccessToken : (data) => {
        return sign(data, process.env.ACCESS_SECRET, {expiresIn:"15h"});
    },
    sendAccessToken : (code, res, accessToken ,result) => {
        res.status(code)
        .cookie('pinkcookie',accessToken,{ httpOnly:true, secure:true, sameSite:'None' })
        .json({result})
    },
    isAuthorized : (req) => {
        let cookie;
        try {
            cookie = req.cookies['pinkcookie'];
            try {
                return verify(cookie,process.env.ACCESS_SECRET)
                
            } catch (err) {
                console.log("sec_try")
                return null;
            }
        } catch ( err ) {
            console.log("first_try")
            return null;
        }
    }
}