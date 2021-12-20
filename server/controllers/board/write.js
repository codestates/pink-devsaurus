const pool = require("../../DB/mysql");

module.exports = async (req,res) => {
    console.log('./controllers/board/write');
    try {
        const data = pool.query(
  
            function(err,result,fields){
                if(err)
                    console.error(err)
                else{
                    console.log(result[0]);
                    res.json({result})            
                }
            }
        )
        
    } catch (err) {
        return res.status(500).json(err)
    }

}