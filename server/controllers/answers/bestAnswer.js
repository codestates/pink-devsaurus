const { BOARD_QA, ANSWER, USER } = require("../../models");
const pool = require("../../DB/mysql");
const { isAuthorized } = require("../TokenFunction");
// like - qeUp.js
module.exports = async (req, res) => {
  console.log("./controllers/answer/bestAnswer");

  //기초 필터링
  if (
    !req.params["boardId"] ||
    !req.body["selected_user_id"] ||
    isNaN(req.params.boardId) ||
    isNaN(req.body.selected_user_id) ||
    req.params.boardId <= 0 ||
    req.body.selected_user_id <= 0
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const token = isAuthorized(req);
  if (!token) {
    return res.status(401).json({ message: "No access token" });
  }

  const answerID = Number(req.params.boardId);
  const selectedUserID = Number(req.body.selected_user_id);

  // Check validity
  let validity;
  try {
    validity = await ANSWER.findOne({
      where: { ANSWER_ID: answerID },
      include: {
        model: BOARD_QA,
      },
    });
  } catch (err) {
    console.dir(err);
    return res.status(500).json("Internal Server Error");
  }

  if (!validity) {
    return res.status(404).json({ message: "Answer not found" });
  }

  if (validity.BOARD_QA.USER_ID !== token.USER_ID) {
    return res.status(403).json({ message: "Not your question" });
  }

  if (validity.BOARD_QA.SELECTED_USER_ID) {
    return res.status(409).json({ message: "Answer already selected" });
  }

  let result;
  try {
    result = await BOARD_QA.update(
      {
        SELECTED_USER_ID: token.USER_ID,
        SELECTED_BREPLY_ID: answerID,
      },
      {
        where: {
          BOARD_ID: validity.BOARD_QA.BOARD_ID,
        },
      }
    );
  } catch (err) {
    console.dir(err);
    return res.status(500).json("Internal Server Error");
  }

  return res.status(204).send();
};
