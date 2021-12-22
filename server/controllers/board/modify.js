const pool = require("../../DB/mysql");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/board/modify");

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params["boardId"] || !req.body["title"] || !req.body["content"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }

  const { boardId } = req.params;
  const { title, content } = req.body;

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
        return res.status(403).json();
      }
      // check_404_Sql Error
      if (result[1].length === 0) {
        return res.status(404).json();
      }
    });

    const setsql = "UPDATE `BOARD_QA` SET ?, `MODIFY_DATE` = now() WHERE ?;";
    const whereSql = pool.format(setsql, {
      TITLE: title,
      CONTENT: content,
    });
    const updateSql = pool.format(whereSql, { BOARD_ID: Number(boardId) });

    pool.query(updateSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(501).json({ message: "DB Query Fail" });
      }
      return res.status(204).json();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
