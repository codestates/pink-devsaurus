const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

/* route config */
const sessionRouter = require("./routes/session");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const questionRouter = require("./routes/questions");
const answerRouter = require("./routes/answers");
const likeRouter = require("./routes/like");

/* cors Option */
const corsOption = {
  origin: function (origin, cb) {
    cb(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
/* middleware */
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

/* Route */
app.use("/", sessionRouter);
app.use("/users", usersRouter);
app.use("/categories", categoryRouter); // categorys -> categories
app.use("/questions", questionRouter);
app.use("/answers", answerRouter);
app.use("/likes", likeRouter);

/* example http server run */
let server;
if (fs.existsSync("./privkey.pem") && fs.existsSync("./fullchain.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + "privkey.pem", "utf-8"),
        cert: fs.readFileSync(__dirname + `/` + "fullchain.pem", "utf-8"),
      },
      app
    )
    .listen(443, () => {
      console.log("https Server Running : https://pinkdevsaurus.tk/:" + 443);
    });
} else {
  server = app.listen(80, () =>
    console.log("http Server Running : http://pinkdevsaurus.tk/:" + 80)
  );
}
