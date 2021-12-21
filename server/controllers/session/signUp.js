const { USER } = require("../../models");
const { genarateAccessToken, sendAccessToken } = require("../TokenFunction");

module.exports = async (req,res,next) => {
    console.log('./controllers/session/signUp');

    // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
    if(!req.body['email'] || !req.body['password'] || !req.body['username']){
        return res.status(400).send({ message: "It has an empty value" })
    }

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
        // end UESR
    } catch ( err ) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}