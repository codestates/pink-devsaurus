const { USER } = require("../../models");
const { isAuthorized } = require("../TokenFunction");

// User - modify
module.exports = async (req, res) => {
  console.log("./controllers/user/modify");
  const accessTokenData = isAuthorized(req);

  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.body.new_password) {
    return res.status(400).send({ message: "It has an empty value" });
  }

  // 개인 추가 했던부분 - 프론트 측에서 검사해야하는데,
  // 비밀번호 정규표현식 (6-16자리 영문, 숫자, 특수문자 조합)
  const regPasswordType = (data) => {
    let regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
    return regex.test(data);
  };

  if (!regPasswordType(req.body.new_password)) {
    return res.status(400).json({
      message: "password does not meet the requirement",
    });
  }

  const { profile_img, new_password } = req.body;

  let validity;
  try {
    validity = await USER.findOne({
      where: { USER_ID: accessTokenData.USER_ID },
    });
  } catch (err) {
    console.dir(err);
    return res.status(500).json("Internal Server Error");
  }

  if (!validity) {
    return res.status(404).json({ message: "Answer not found" });
  }

  if (validity.USER_ID !== accessTokenData.USER_ID) {
    return res.status(403).json({ message: "Not your answer" });
  }

  let result;
  try {
    result = await USER.update(
      {
        PASSWORD: new_password,
        PROFILE_IMG: profile_img,
      },
      {
        where: {
          USER_ID: accessTokenData.USER_ID,
        },
      }
    );
  } catch (err) {
    console.dir(err);
    return res.status(500).json("Internal Server Error");
  }

  return res.status(204).send();
};
