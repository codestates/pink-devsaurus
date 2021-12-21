const pool = require("../../DB/mysql");
const models = require("../../models");
const { LIKES_BOARD } = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/like/questionsLikeDown");
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

  // unManagedTransaction 명시
  const unManagedTransaction = await models.sequelize.transaction();
  try {
    // 취소 할 경우 자신이 작성한 좋아요인지 체크
    // 게시글이 있는지 확인
    const check_403_Sql = `SELECT * FROM LIKES_BOARD WHERE BOARD_ID = ${boardId} AND USER_ID = ${accessTokenData.USER_ID};`;
    const check_404_Sql = `SELECT * FROM LIKES_BOARD WHERE BOARD_ID = ${boardId};`;

    pool.query(check_404_Sql + check_403_Sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(501).json({ message: "DB Query Fail" });
      }
      // check_404_Sql Error
      if (result[0].length === 0) {
        return res.status(404).json({ message: "Not found - mysql2" });
      }
      // check_403_Sql Error
      if (result[1].length === 0) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }); // end pool.query

    // destory
    const destroy_LIKES_BOARD = await LIKES_BOARD.destroy(
      {
        where: { USER_ID: accessTokenData.USER_ID, BOARD_ID: boardId },
      },
      { transaction: unManagedTransaction }
    );
    if (destroy_LIKES_BOARD > 0) {
      await unManagedTransaction.commit();
      return res.status(204).json();
    } else {
      await unManagedTransaction.rollback();
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(501).json({ message: "Internet Server Fail" });
  }
};
