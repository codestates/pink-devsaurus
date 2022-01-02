require('dotenv').config();
const pool = require("../../DB/mysql");
const { isAuthorized } = require("../TokenFunction");
module.exports = async (req,res) => {
    console.log('./controllers/session/userinfo');
    if(!req.cookies['pinkcookie']){
        return res.status(401).json({message:"No access token"});
    }

    const user_info = isAuthorized(req);
    if(!user_info) {
        return res.status(401).json({message:"Access token invalild"});
    }

    try{
        const { USER_ID,EMAIL,USERNAME,PROFILE_IMG } = user_info;
        const questionsSql = 'SELECT COUNT(USER_ID) AS QUESTIONS FROM `BOARD_QA` WHERE USER_ID=?;';
        const questionsSqls = pool.format(questionsSql,USER_ID)
        const answerSql = 'SELECT COUNT(USER_ID) AS ANSWER FROM `ANSWER` WHERE USER_ID=?;';
        const answerSqls = pool.format(answerSql,USER_ID);

        pool.query(questionsSqls + answerSqls, function (err, result) {
            if(err){
                console.error(err);
                return res.status(501).json({message:"DB Query Fail"})
            } 
            console.log(result);
            const {QUESTIONS} = result[0][0]
            const {ANSWER} = result[1][0]           

            return res.status(200).json({result:{
                email: EMAIL,
                username: USERNAME,
                questions: QUESTIONS,
                answer: ANSWER,
                profile_image: PROFILE_IMG
            }})
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}