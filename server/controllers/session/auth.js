const { USER } = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req,res) => {
    console.log('./controllers/session/auth');
    if(!req.cookies['pinkcookie']){
        return res.status(401).json({message:"No access token"});
    }

    const user_info = isAuthorized(req);
    if(!user_info) {
        return res.status(401).json({message:"Access token invalild"});
    }
    
    try {
        USER
        .findOne({
            where:{
                USER_ID:user_info.USER_ID
            }
        })
        .then( data => {
            delete data.dataValues.password;
            const {USER_ID ,EMAIL, USERNAME, CREATED_REG,PROFILE_IMG} = data.dataValues;
            res.status(200).json({
                result:{
                    user_id:USER_ID,
                    email:EMAIL,
                    username:USERNAME,
                    created_reg:CREATED_REG,
                    profile_img:PROFILE_IMG
                }
            })
        })
    } catch (err) { 

    }
}