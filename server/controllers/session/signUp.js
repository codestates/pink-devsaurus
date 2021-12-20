const { USER } = require("../../models");
const { genarateAccessToken, sendAccessToken } = require("../TokenFunction");

// userInfoMsg - Craeted DATE how ???

module.exports = async (req,res,next) => {
    console.log('./controllers/session/signUp');

    const { email, username, password } = req.body;

    try{
        await USER
           .findOrCreate({
                where:{ EMAIL: email },
                defaults: {
                    EMAIL:email,
                    USERNAME:username,
                    PASSWORD:password
                }
           })
           .then(check => {
               const [data , checked] = check;
               if(!checked){
                   return res.status(409).json("already exists");
                }
                const userInfo = data.dataValues;
                delete userInfo.password;
                
                const userInfoMsg = {
                    user_id : userInfo.USER_ID,
                    email : userInfo.EMAIL,
                    username : userInfo.USERNAME,
                    created_at : new Date()
                }
                const accessToken = genarateAccessToken(userInfo);
                sendAccessToken(201,res,accessToken,userInfoMsg)
           })
    } catch ( err ) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}