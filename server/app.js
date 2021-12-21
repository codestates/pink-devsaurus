const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const https = require("https");
const fs = require("fs");

/* SSL/TLS privateKey,certificate */
const privateKey = fs.readFileSync("/etc/letsencrypt/live/privkey.pem");
const certificate = fs.readFileSync("/etc/letsencrypt/live/fullchain.pem");
const credentials = { key: privateKey, cert: certificate };

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

/* http/https server */
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
