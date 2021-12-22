const { ANSWER, LIKES_BOARD } = require("../../models");
const models = require("../../models");
const pool = require("../../DB/mysql");
const { isAuthorized } = require("../TokenFunction");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  console.log("./controllers/answer/delete");
  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params.answerId || isNaN(Number(req.params.answerId))) {
    // return res.status(400).send({ message: "It has an empty value" });
    return res.status(400).send({ message: "Bad Request" });
  }

  const { answerId } = req.params;
  const accessTokenData = isAuthorized(req);

  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  /*
  const t = await models.sequelize.transaction();
  try {
    const result_Answer = await ANSWER.destroy({
      where : { 'ANSWER_ID' : answerId, 'USER_ID', accessTokenData.USER_ID }
    }, { transaction: t });

    const result_LikesBoard = await LIKES_BOARD.destroy({
      where : { 'ANSWER_ID' : answerId }
    }, { transaction: t });
   
    await t.commit();
    return res.status(204).send();

  } catch( error ) {
    await t.rollback();
    return res.status(500).json(error);    
  }
  */

  try {
    const check_403_Sql = `SELECT ANSWER_ID,USER_ID FROM ANSWER WHERE USER_ID = ${accessTokenData.USER_ID} AND ANSWER_ID = ${answerId}; `;
    const check_404_Sql = `SELECT * FROM ANSWER WHERE ANSWER_ID = ${answerId}; `;

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
        return res
          .status(404)
          .json({ message: "Bad Request - mysql2 [ ANSWER_ID ]" });
      }
    });
    /*
      answer_id를 이용하여 answer 글 삭제
       - delete from ANSWER WHERE answer_id = ${answerId} AND user_id = ${accessTokenData.USER_ID}
      LIKES_BOARD 안에 answer_id와 동일한 row 삭제
       - delete from LIKES_BOARD WHERE answer_id = ${answerId}
    */
  } catch (err) {
    // try catch
    return res
      .status(501)
      .json({ message: "DB Quey Fail - mysql2 Query fail" });
    //console.error(err);
    //return res.status(500).json({ message: "Internal Server Error" });
  }

  const t = await models.sequelize.transaction();

  try {
    // UnManaged Transaction
    const result_Answer = await ANSWER.destroy(
      {
        where: { ANSWER_ID: answerId, USER_ID: accessTokenData.USER_ID },
      },
      { transaction: t }
    );

    const result_LikesBoard = await LIKES_BOARD.destroy(
      {
        where: { ANSWER_ID: answerId },
      },
      { transaction: t }
    );

    await t.commit();
    return res.status(204).send();
  } catch (error) {
    await t.rollback();
    console.dir(error);
    return res.status(500).json(error);
  }
};