const { ANSWER } = require("../../models");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/answer/write");
  const accessTokenData = isAuthorized(req);
  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.body["board_id"] || !req.body["content"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }
  const { board_id, title, content } = req.body;

  try {
    ANSWER.create({
      BOARD_ID: board_id,
      USER_ID: accessTokenData.USER_ID,
      ANSWER_CONTENT: content,
    })
      .then((data) => {
        if (!data) {
          return res.status(501).json({ message: "DB Query Fail" });
        }
        return res.status(201).json({ message: "ok" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(501).json({ message: "DB Query Fail" });
      });
    // end ANSWER
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
