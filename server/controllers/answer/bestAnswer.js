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
  try {
    const result = await ANSWER.findOne({
      where: { ANSWER_ID: answerID },
      include: {
        model: BOARD_QA,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
  return res.status(403).json({ message: "Not enough rights" });

  try {
    const result = await ANSWER.findOne({
      where: { ANSWER_ID: answerID },
      include: {
        model: BOARD_QA,
      },
    });

    return res.status(200).json(result);
    //return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    // return res.status(500).json({ message: "Internal Server Error" });
  }
};
