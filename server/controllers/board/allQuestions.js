const pool = require("../../DB/mysql");

module.exports = async (req,res) => {
    console.log('./controllers/board/allQuestions');
    try {

        const boardSql = `SELECT * FROM BOARD_QA; `
        const likeCountSql = `SELECT COUNT(BOARD_ID) AS LIKECOUNT FROM LIKES_BOARD WHERE BOARD_ID = ?;`;
        const answerCountSql = `SELECT COUNT(BOARD_ID) AS ANSWERCOUNT FROM ANSWER WHERE BOARD_ID = ?;`;
        const userSql = `SELECT USERNAME FROM USER WHERE USER_ID = ?;`;

        pool.query(boardSql,(err,result) => {
            if(err){
                console.error(err);
                return res.status(501).json({message:"DB Query Fail"})
            }

            let response = [];
            Promise.all(result.map((element,index) => {
                const likeCountSqls = pool.format(likeCountSql,element.BOARD_ID);
                const answerCountSqls = pool.format(answerCountSql,element.BOARD_ID);
                const userSqls = pool.format(userSql,element.USER_ID);
                let promise = new Promise((resolve,reject) => {
                    pool.query(likeCountSqls + answerCountSqls + userSqls,(err,rows) => {
                        if(err){
                            console.error(err);
                            return res.status(501).json({message:"DB Query Fail"})
                        }
                        console.log(rows)
                        const {LIKECOUNT} = rows[0][0];
                        const {ANSWERCOUNT} = rows[1][0];
                        const {USERNAME} = rows[2][0];
                        resolve({LIKECOUNT,ANSWERCOUNT,USERNAME,index});
                    })
                })
                return promise.then( (queryResult) => {
                    result[queryResult.index].board_id = result[queryResult.index].BOARD_ID;
                    result[queryResult.index].title = result[queryResult.index].TITLE;
                    result[queryResult.index].likes = queryResult.LIKECOUNT;
                    result[queryResult.index].author = queryResult.USERNAME;
                    result[queryResult.index].modify_at = result[queryResult.index].MODIFY_DATE;
                    result[queryResult.index].answers = queryResult.ANSWERCOUNT;
                    result[queryResult.index].answered_user_id = result[queryResult.index].SELECTED_USER_ID;
                    delete result[queryResult.index].BOARD_ID;
                    delete result[queryResult.index].USER_ID;
                    delete result[queryResult.index].CATEGORY_ID;
                    delete result[queryResult.index].TITLE;
                    delete result[queryResult.index].CONTENT;
                    delete result[queryResult.index].CREATED_DATE;
                    delete result[queryResult.index].MODIFY_DATE;
                    delete result[queryResult.index].SELECTED_BREPLY_ID;
                    delete result[queryResult.index].SELECTED_USER_ID;
                })
            }))
            .then(() => {
                return res.status(200).json({result})
            })
            .catch(err => {
                console.error(err);
                return res.status(501).json({message:"Promise Fail"})
            })

        }) // end poll.query

    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal Server Error"});
    }

}