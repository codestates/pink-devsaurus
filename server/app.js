const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

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
const HTTPS_PORT = 80;
app.listen(HTTPS_PORT, () =>
  console.log(
    "http Server Running : http://ec2-3-35-24-147.ap-northeast-2.compute.amazonaws.com:",
    HTTPS_PORT
  )
);
