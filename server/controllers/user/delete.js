const { USER } = require('../../models');
const { isAuthorized } = require('../TokenFunction');

// User - delete

module.exports = async (req, res) => {
  console.log('./controllers/user/delete');
  const accessTokenData = isAuthorized(req);
  // 잘못된 accessToken을 받았을 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  // 정상적인 데이터를 받지 못한 경우 (필수 데이터가 없는 경우)
  if (!req.params['userId'] || !req.body['password']) {
    return res.status(400).send({ message: 'It has an empty value' });
  }
  const { userId } = req.params;
  const { password } = req.body;

  if (accessTokenData.USER_ID !== Number(userId)) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  try {
    // findOne 으로 데이터 찾은 후
    const created_USER = USER.findOne({
      where: {
        USER_ID: userId,
      },
    });
    created_USER.then((data) => {
      if (data === null) {
        return res.status(404).json();
      }
      const { USER_ID, PASSWORD } = data.dataValues;
      if (USER_ID !== Number(userId) || PASSWORD !== password) {
        return res.status(403).send({ message: 'Forbidden' });
      }
    });
  } catch (err) {
    console.error(err);
    return res.end();
  }

  try {
    const delete_USER = USER.destroy({
      where: {
        USER_ID: userId,
      },
    }).then((data) => {
      if (data === 0) {
        return res.status(404).json();
      }
      return res.status(204).json();
    });
  } catch (err) {
    console.error(err);
    return;
  }
};