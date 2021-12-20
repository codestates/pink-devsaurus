const pool = require("../../DB/mysql");

module.exports =  (req,res) => {
    console.log('./controllers/category/allCategory');
    try {
        const data = pool.query(
            'SELECT * FROM `CATEGORY_QA`',
            function (err,result) {
                if(err){
                    console.error(err)
                } else {
                    console.log(result)
                    res.json({result})
                }
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
}