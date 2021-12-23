const pool = require("../../DB/mysql");
const { LIKES_BOARD } = require("../../models");
const models = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/like/questionsLikeUp");
  const accessTokenData = isAuthorized(req);
  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params["boardId"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }
  const { boardId } = req.params;

  try {
    // 다중 쿼리문을 사용 할 경우 SQL문 끝에 ( ; ) 이 꼭 붙어야 합니다.
    const check_403_Sql = `SELECT * FROM BOARD_QA WHERE BOARD_ID = ${boardId} AND USER_ID = ${accessTokenData.USER_ID};`;
    const check_404_Sql = `SELECT * FROM BOARD_QA WHERE BOARD_ID = ${boardId};`;
    const check_409_Sql = `SELECT BOARD_ID,USER_ID FROM LIKES_BOARD WHERE USER_ID = ${accessTokenData.USER_ID} AND BOARD_ID = ${boardId};`;

    pool.query(check_404_Sql + check_403_Sql + check_409_Sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(501).json({ message: "DB Query Fail" });
      }
      // check_404_Sql Error
      if (result[0].length === 0) {
        return res.status(404).json({ message: "Not found - mysql2" });
      }
      // check_403_Sql Error
      if (result[1].length > 0) {
        return res.status(403).json({ message: "Forbidden" });
      }
      // check_409_Sql Error
      if (result[2].length > 0) {
        return res.status(409).json({ message: "Confilict" });
      }
    });
    const created_LIKES_BOARD = LIKES_BOARD.findOrCreate({
      where: { USER_ID: accessTokenData.USER_ID, BOARD_ID: boardId },
      defaults: {
        USER_ID: accessTokenData.USER_ID,
        BOARD_ID: boardId,
        ANSWER_ID: null,
      },
    });
    created_LIKES_BOARD.then((data) => {
      res.status(201).json();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
