const pool = require('../../DB/mysql');

module.exports = async (req, res) => {
  console.log('./controllers/board/answers');

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params['boardId']) {
    return res.status(400).send({ message: 'It has an empty value' });
  }
  const { boardId } = req.params;
  try {
    const answerSql = `SELECT USER_ID,ANSWER_ID, ANSWER_CONTENT AS answer_content, CREATED_DATE AS created_date, MODIFY_DATE AS modify_date FROM ANSWER WHERE BOARD_ID = ${boardId};`;
    const answerUserSql = `SELECT USER_ID, USERNAME AS answer_username, PROFILE_IMG AS userprofile_img FROM USER WHERE USER_ID = ?;`;
    const answerLikeCountSql = `SELECT ANSWER_ID, COUNT(ANSWER_ID) AS LIKESCOUNT FROM LIKES_BOARD WHERE ANSWER_ID = ?;`;

    pool.query(answerSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(501).json({ message: 'DB Query Fail' });
      }
      // console.log(result);
      Promise.all(
        result.map((element, index) => {
          const answerUserSqls = pool.format(answerUserSql, element.USER_ID);
          const answerLikeCountSqls = pool.format(
            answerLikeCountSql,
            element.ANSWER_ID
          );

          let promise = new Promise((resolve, reject) => {
            pool.query(answerUserSqls + answerLikeCountSqls, (err, rows) => {
              if (err) {
                console.error(err);
                return res.status(501).json({ message: 'DB Query Fail' });
              }
              console.log(rows);
              const { USER_ID, answer_username, userprofile_img } = rows[0][0];
              const { ANSWER_ID, LIKESCOUNT } = rows[1][0];

              resolve({
                USER_ID,
                answer_username,
                userprofile_img,
                LIKESCOUNT,
              });
            }); // end pool.query
          }); // end promise
          return promise.then((queryResult) => {
            // console.log(element);
            // console.log(queryResult);
            element.answer_id = element.ANSWER_ID;
            element.user_id = element.USER_ID;
            element.answer_username = queryResult.answer_username;
            element.userprofile_img = queryResult.userprofile_img;
            element.answer_likes = queryResult.LIKESCOUNT;

            delete element.USER_ID;
            delete element.ANSWER_ID;
          });
        }) // end result.map
      ) // end Promise.all
        .then(() => {
          return res.status(200).json({
            answer: result,
          });
        });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
