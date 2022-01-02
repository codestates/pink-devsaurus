const pool = require("../../DB/mysql"); // mysql2 query
const { ANSWER } = require("../../models"); // sequelize
const { isAuthorized } = require("../TokenFunction"); // authorized
const sanitizer = require("sanitizer");

// board/modify.js    // mysql2 query
// board/wirte.js     // sequelize

module.exports = async (req, res) => {
  console.log("./controllers/answer/modify");

  //기초 필터링
  if (
    !req.params["boardId"] ||
    !req.body["content"] ||
    isNaN(req.params.boardId) ||
    req.params.boardId <= 0 ||
    !req.body.content.length
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const token = isAuthorized(req);
  if (!token) {
    return res.status(401).json({ message: "No access token" });
  }

  const answerID = Number(req.params.boardId);
  const editedContent = sanitizer.sanitize(req.body.content);

  // Check validity
  let validity;
  try {
    validity = await ANSWER.findOne({
      where: { ANSWER_ID: answerID },
    });
  } catch (err) {
    console.dir(err);
    return res.status(500).json("Internal Server Error");
  }

  if (!validity) {
    return res.status(404).json({ message: "Answer not found" });
  }

  if (validity.USER_ID !== token.USER_ID) {
    return res.status(403).json({ message: "Not your answer" });
  }

  let result;
  try {
    result = await ANSWER.update(
      {
        ANSWER_CONTENT: editedContent,
        MODIFY_DATE: new Date().toISOString(),
      },
      { where: { ANSWER_ID: answerID } }
    );
  } catch (err) {
    console.dir(err);
    return res.status(500).json("Internal Server Error");
  }

  return res.status(204).send();
};
