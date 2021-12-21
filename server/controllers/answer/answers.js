const pool = require("../../DB/mysql");

module.exports = async (req, res) => {
  console.log("./controllers/board/answers");

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params["boardId"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }

  const { boardId } = req.params;

  try {
    const boardSql = `SELECT USER_ID, TITLE AS title, CONTENT AS content, CREATED_DATE AS created_date, MODIFY_DATE AS modify_date FROM BOARD_QA WHERE BOARD_ID = ${boardId};`;
    const boardUserSql = `SELECT * FROM USER WHERE USER_ID = ?;`;
    const boardLikeCountSql = `SELECT COUNT(BOARD_ID) AS LIKESCOUNT FROM LIKES_BOARD WHERE BOARD_ID = ${boardId}`;

    pool.query(boardSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(501).json({ message: "DB Query Fail" });
      }
      const boardResult = result[0];
      const boardUserSqls = pool.format(boardUserSql, boardResult.USER_ID);

      pool.query(boardUserSqls + boardLikeCountSql, (err, resultUserLike) => {
        boardResult.username = resultUserLike[0][0].USERNAME;
        boardResult.userprofile_img = resultUserLike[0][0].PROFILE_IMG;
        boardResult.likes = resultUserLike[1][0].LIKESCOUNT;

        delete boardResult.USER_ID;

        res.status(201).json({ result: boardResult });
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};    


    
    const answerSql = `SELECT ANSWER_ID AS answer_id, ANSWER_TITLE AS answer_title, ANSWER_CONTENT AS answer_content, CREATED_DATE AS craeted_date, MODIFY_DATE AS modify_date FROM ANSWER WHERE BOARD_ID = ${boardId};`;
    const answerUserSql = ``;
    
    /*
{
    BOARD_ID: 1,
    USER_ID: 1,
    CATEGORY_ID: '1',
    TITLE: 'test_title1',
    CONTENT: 'test_content',
    CREATED_DATE: 2021-12-20T00:41:45.000Z,
    MODIFY_DATE: 2021-12-20T00:41:45.000Z,
    SELECTED_BREPLY_ID: null,
    SELECTED_USER_ID: null
}
{
    ANSWER_ID: 6,
    BOARD_ID: 1,
    USER_ID: 4,
    ANSWER_TITLE: 'test_answer_title6',
    ANSWER_CONTENT: 'test_answer_content4',
    CREATED_DATE: 2021-12-20T00:42:05.000Z,
    MODIFY_DATE: 2021-12-20T00:42:05.000Z
}
            result : {
                title       
                content

                likes               // COUNT LIKE

                username            // USER
                userprofile_img

                created_date
                modify_date
            }
                answer : [
                    {
                        answer_username // USER
                        userporfile_img

                        answer_id
                        answer_title
                        answer_content
                        created_date
                        modifed_date

                        answer_likes    // COUNT LIKE
                    },
                    {
                        answer_username
                        userporfile_img
                        answer_id
                        answer_title
                        answer_content
                        created_date
                        modifed_date
                        answer_likes
                    }, ....
                ]
            },

        */