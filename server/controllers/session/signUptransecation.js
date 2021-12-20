const pool = require("../../DB/mysql");

module.exports = async (req,res,next) => {
    console.log('./controllers/session/signUp');
    try {
        const { email, username, password } = req.body;
        const userSignUpObj = {
            EMAIL: email,
            USERNAME: username,
            PASSWORD: password,
        }
        const sql = 'insert into USER set ? '

        pool.beginTransaction();

        const data = pool.query(sql,userSignUpObj,function(err,result){
            if(err){
                console.error(err);
                return res.status(409).end();
            }
            else{
                console.log(result);
                return res.json(result)
            }
        })

    } catch (err){
        return res.status(500).json(err)
    }
}