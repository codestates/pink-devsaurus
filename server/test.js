const sanitizer = require("sanitizer");

/* [json String] Sequrity & formating parser */
module.exports = (req, res, next) => {
  if (!req.is("application/json")) {
    return next();
  }
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    const sanitizerData = sanitizer.sanitize(data);
    req.body = JSON.parse(sanitizerData);
    next();
  });
};
