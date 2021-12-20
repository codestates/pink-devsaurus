const { USER } = require("../../models");
const { genarateAccessToken, sendAccessToken } = require("../TokenFunction");

module.exports = async (req,res) => {
    console.log('./controllers/session/logIn');

    const { email, password } = req.body;

    try{
        USER
            .findOne({
                where: {
                    EMAIL: email,
                    PASSWORD: password
                }
            })
            .then( data => {
                if(!data) {
                    return res.status(400).json({message:'misinformation'});
                }
                
                const userInfo = data.dataValues;
                delete userInfo.password;
    
                const accessToken = genarateAccessToken(userInfo);
                console.log("accessToken : ",accessToken);
                sendAccessToken(201,res,accessToken);
            })
    } catch ( err ) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}