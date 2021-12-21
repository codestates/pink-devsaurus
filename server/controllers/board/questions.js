const pool = require("../../DB/mysql");

module.exports = async (req, res) => {
  console.log("./controllers/board/questions");

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params["boardId"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }

  const { boardId } = req.params;

  try {
    const boardSql = `SELECT USER_ID, BOARD_ID AS board_id , TITLE AS title, CONTENT AS content, CREATED_DATE AS created_date, MODIFY_DATE AS modify_date FROM BOARD_QA WHERE BOARD_ID = ${boardId};`;
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
/**
{
  "result": {
    "title": "test_title1",
    "content": "test_content",
    "created_date": "2021-12-20T00:41:45.000Z",
    "modify_date": "2021-12-20T00:41:45.000Z",
    "username": "testUser1",
    "userprofile_img": null,
    "likes": 4
  }
}
*/
