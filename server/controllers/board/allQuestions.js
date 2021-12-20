const pool = require("../../DB/mysql");

module.exports = async (req,res) => {
    console.log('./controllers/board/allQuestions');
    try {
        const data = pool.query(
            'select ' +
            'bq.BOARD_ID as board_id, bq.TITLE as title, count(lb.BOARD_ID) as likes, ' +
            'us.USERNAME as author, bq.CREATED_DATE as created_at, bq.MODIFY_DATE as modify_at, ' +
            'count(aw.BOARD_ID) as answer, aw.USER_ID ' +
            'from `BOARD_QA` as bq  ' +
            'INNER JOIN `USER` as us ' +
            'ON bq.USER_ID = us.USER_ID ' +
            'INNER JOIN `LIKES_BOARD` as lb ' +
            'ON bq.BOARD_ID = lb.BOARD_ID ' +
            'INNER JOIN `ANSWER` as aw  ' +
            'ON bq.BOARD_ID = aw.BOARD_ID',
            
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
        console.error(err);
        return res.status(500).json(err)
    }

}