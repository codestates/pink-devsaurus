const pool = require("../../DB/mysql");

module.exports = async (req, res) => {
  console.log("./controllers/session/logOut");
  res
    .status(201)
    .clearCookie("pinkcookie", {
      path: "/",
    })
    .json({ message: "logOut Access" });
};
