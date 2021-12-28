const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  verifyIntegrity: function (req) {
    const token = req.header('X-Hub-Signature-256').split('=')[1];
    const hmac = crypto
      .createHmac('sha256', process.env.GITHUB_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');
    return hmac === token;
  },
};
