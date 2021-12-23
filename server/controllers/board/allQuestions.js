const pool = require("../../DB/mysql");
const { BOARD_QA } = require("../../models");
module.exports = async (req, res) => {
  console.log("./controllers/board/allQuestions");
  /*
    (필수) page=3 (Number / 10의 배수)
    (( 특정 카테고리만 요청하기 ))
    (선택) catagory=1 (category_id, Number)
    (( 특정 유저의 질문 혹은 답변만 요청하기 ))
  */
  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  //  if (!req) {
  //   return res.status(400).send({ message: "It has an empty value" });
  // }
  let pageNum = req.query.page;
  let categoryNum = req.query.category;
  let offset = 0;
  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }
  const pageNationSql = `SELECT 
  BQ.BOARD_ID, 
  BQ.TITLE AS title,
  US.USERNAME AS author,
  BQ.MODIFY_DATE AS modified_at,
  COUNT(AW.BOARD_ID) as answers,
  BQ.SELECTED_USER_ID AS answered_user_id,
  CQ.CATEGORY_IMG AS category_img
  FROM BOARD_QA BQ
  LEFT JOIN USER AS US
  ON BQ.USER_ID = US.USER_ID
  LEFT JOIN ANSWER AS AW
  ON BQ.BOARD_ID = AW.BOARD_ID
  LEFT JOIN CATEGORY_QA AS CQ
  ON BQ.CATEGORY_ID = CQ.CATEGORY_ID
  WHERE 1 ${
    categoryNum ? "AND BQ.CATEGORY_ID = " + categoryNum + " " : ""
  }GROUP BY BQ.BOARD_ID ORDER BY BQ.BOARD_ID DESC
  LIMIT ${offset},10;`;

  try {
    const pageNationSqlQuery = pool.query(pageNationSql, (err, result) => {
      if (err) {
        throw err;
      }

      Promise.all(
        result.map((element, index) => {
          const likeCountSql = `SELECT COUNT(BOARD_ID) AS likes FROM LIKES_BOARD WHERE BOARD_ID = ${element.BOARD_ID}`;

          let promise = new Promise((resolve, reject) => {
            const likeCountQuery = pool.query(
              likeCountSql,
              (err, likeCountResult) => {
                const { likes } = likeCountResult[0];
                resolve(likes);
              }
            ); // end pool.query
          }); // end promise
          return promise.then((likes) => {
            result[index].likes = likes;
          });
        }) // end result.map
      ) // end Promise.all
        .then(() => {
          res.status(201).json({ result });
        });
    }); // end pool.query
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
