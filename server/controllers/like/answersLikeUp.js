const pool = require("../../DB/mysql");
const { LIKES_BOARD } = require("../../models");
const models = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/like/answersLikeUp");
  const accessTokenData = isAuthorized(req);
  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params.answerId) {
    return res.status(400).send({ message: "It has an empty value" });
  }
  const { answerId } = req.params;

  // 다중 쿼리문을 사용할 경우 SQL문 끝에 ( ; ) 이 꼭 붙어야 합니다.
  // try {
  // const check_403_Sql = `SELECT * FROM BOARD_QA WHERE ANSWER_ID = ${answerId} AND USER_ID = ${accessTokenData.USER_ID};`;
  // const check_404_Sql = `SELECT * FROM BOARD_QA WHERE ANSWER_ID = ${answerId};`;
  // const check_409_Sql = `SELECT ANSWER_ID,USER_ID FROM LIKES_BOARD WHERE USER_ID = ${accessTokenData.USER_ID} AND ANSWER_ID = ${answerId};`;

  // pool.query(check_403_Sql + check_404_Sql + check_409_Sql, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(501).json({ message: "DB Query Fail" });
  //   }
  //   // check_404_Sql Error
  //   if (result[0].length > 0) {
  //     return res.status(403).json({ message: "Forbidden" });
  //   }
  //   // check_404_Sql Error
  //   if (result[1].length === 0) {
  //     return res.status(404).json({ message: "Not found - mysql2" });
  //   }
  //   // check_409_Sql Error
  //   if (result[2].length > 0) {
  //     return res.status(403).json({ message: "Confilict" });
  //   }
  // });

  const transaction = await models.sequelize
    .transaction(async (t) => {
      const created_LIKES_BOARD = await LIKES_BOARD.findOrCreate({
        where: {
          USER_ID: accessTokenData.USER_ID,
          BOARD_ID: null,
          ANSWER_ID: answerId,
        },
      }).then(([result, created]) => {
        if (!created) {
          return res.status(201).json({ message: "Already liked" });
        }
        return res.status(201).json({ message: "ok" });
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
