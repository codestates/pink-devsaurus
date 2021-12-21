const { BOARD_QA, LIKES_BOARD, ANSWER } = require("../../models");
const models = require("../../models");
const pool = require("../../DB/mysql");
const { isAuthorized } = require("../TokenFunction");
const sequelize = require("sequelize");

// 삭제 할 경우 LIKES_BOARD / ANSWER 삭제 해야함
// 다음 DB 설계 할때 DB 구조 잘 설계 할것 게시글과 답변글 같은 경우 의존성 주입할 것.

module.exports = async (req, res) => {
  console.log("./controllers/board/delete");
  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params["boardId"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }

  const { boardId } = req.params;

  const accessTokenData = isAuthorized(req);
  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const check_403_Sql = `SELECT BOARD_ID,USER_ID FROM BOARD_QA WHERE USER_ID = ${accessTokenData.USER_ID} AND BOARD_ID = ${boardId}; `;
    const check_404_Sql = `SELECT * FROM BOARD_QA WHERE BOARD_ID = ${boardId}; `;

    pool.query(check_403_Sql + check_404_Sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(501).json({ message: "DB Query Fail" });
      }
      // check_403_Sql Error
      if (result[0].length === 0) {
        return res.status(403).json({ message: "Forbidden" });
      }
      // check_404_Sql Error
      if (result[1].length === 0) {
        return res.status(404).json({ message: "Not found - mysql2" });
      }
    });

    const transaction = await models.sequelize
      .transaction(async (t) => {
        const destroyed_BOARD_QA = await BOARD_QA.destroy(
          {
            where: {
              BOARD_ID: boardId,
              USER_ID: accessTokenData.USER_ID,
            },
          },
          { transaction: t }
        );

        const destroyed_LIKES_BOARD = await LIKES_BOARD.destroy(
          {
            where: {
              BOARD_ID: boardId,
            },
          },
          { transaction: t }
        );

        const destroyed_ANSWER = await ANSWER.destroy(
          {
            where: {
              BOARD_ID: boardId,
            },
          },
          { transaction: t }
        );
      })
      .then((_) => {
        console.log(_);
        return res
          .status(201)
          .json({ message: "BOARD_QA, LIKES_BOARD, ANSWER delete" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).json({ message: "Not found - sequelize" });
      });
    // BOARD_QA.destroy({
    //   where: {
    //     BOARD_ID: boardId,
    //     USER_ID: accessTokenData.USER_ID,
    //   },
    // })
    //   .then((destoryed) => {
    //     if (!destoryed) {
    //       return res
    //         .status(501)
    //         .json({ message: "DB Quey Fail - destory fail" });
    //     }
    //     return res.status(204).json({ message: "destory success" });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     return res.status(404).json({ message: "Not found - sequelize" });
    //   });
    // end BOARD_QA
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
