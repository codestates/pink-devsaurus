const pool = require("../../DB/mysql");
const { isAuthorized } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/session/asUp");
  const accessTokenData = isAuthorizedrized(req);
  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
