const { USER } = require("../../models");
const { genarateAccessToken, sendAccessToken } = require("../TokenFunction");

module.exports = async (req, res) => {
  console.log("./controllers/session/logIn");

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.body["username"] || !req.body["password"]) {
    return res.status(400).send({ message: "It has an empty value" });
  }

  const { username, password } = req.body;

  try {
    USER.findOne({
      where: {
        USERNAME: username,
        PASSWORD: password,
      },
    }).then((data) => {
      // !data - 400 misinformation 다시한번 생각
      if (!data) {
        return res.status(400).json({ message: "misinformation" });
      }

      const userInfo = data.dataValues;
      delete userInfo.password;

      const accessToken = genarateAccessToken(userInfo);
      sendAccessToken(201, res, accessToken);
    });
    // end UESR
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
