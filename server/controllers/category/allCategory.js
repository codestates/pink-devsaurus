const pool = require("../../DB/mysql");

module.exports = (req, res) => {
  console.log("./controllers/category/allCategory");
  try {
    const categoySql =
      "SELECT CATEGORY_NAME AS category_name, CATEGORY_IMG AS category_image FROM `CATEGORY_QA`";
    const data = pool.query(
      // SQL문 작성 : 최민우
      categoySql,
      function (err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
          res.json({ result });
        }
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
