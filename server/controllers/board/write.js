const { BOARD_QA } = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req,res) => {
    console.log('./controllers/board/write');
    
    // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
    if(!req.body['category_id'] || !req.body['title'] || !req.body['content']){
        return res.status(400).send({ message: "It has an empty value" })
    }
    const { category_id, title, content } = req.body;
        
    const accessTokenData = isAuthorized(req);
    // 잘못된 accessToken을 받았을 경우
    if (!accessTokenData) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    
    const t = await sequelize.transaction();

    try {
        BOARD_QA
            .create({
                USER_ID:accessTokenData.USER_ID,
                CATEGORY_ID:category_id,
                TITLE:title,
                CONTENT:content,
                SELECTED_BREPLY_ID: null,
                SELECTED_USER_ID: null
            })
            .then( data => {
                if(!data){
                    return res.status(501).json({message:"DB Query Fail"})
                }
                return res.status(201).json({message:'ok'})
            })
            .catch(err => {
                console.error(err)
                return res.status(501).json({message:"DB Query Fail"})
            })
        // end BOARD_QA
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}