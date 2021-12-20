const { USER } = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req,res) => {
    console.log('./controllers/user/modify');
    const accessTokenData = isAuthorized(req);
    console.log(accessTokenData);
    // 잘못된 accessToken을 받았을 경우
    if (!accessTokenData) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
    if(!req.body['new_password']){
        return res.status(400).send({ message: "It has an empty value" })
    }

    // 비밀번호 정규표현식 (6-16자리 영문, 숫자, 특수문자 조합)
    const regPasswordType = (data) => {
        var regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
    	return regex.test(data);
    }
    if(!regPasswordType(req.params['new_password'])){
        return res.status(400).json({
            message:"password does not meet the requirement"
        })
    }
    
    // Forbidden (AccessToken 과 body.password 값이 다른 경우)
    // ?? erd 에는 password 변경 passowrd만 받기로 작성 되어 있음.

    try {
        // USER
        //     .update(
        //         {
        //             PASSWORD: req.params['new_password']
        //         },
        //         {
        //             where:{
                        
        //             }
        //         }
        //     )
    } catch (err){

    }
}