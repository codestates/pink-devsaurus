require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// HTTP 1.1
// const app = express();

// HTTP 2.0 Test
const { readFileSync } = require('fs');
const http2Express = require('http2-express-bridge');
const http2 = require('http2');
const app = http2Express(express);
const options = {
  key: readFileSync('./cert/privkey.pem'),
  cert: readFileSync('./cert/fullchain.pem'),
  allowHTTP1: true,
};

// Security First
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

// Cookie and body parser
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Main Logger
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${req.ip} ${req.method} -( 
      ${Object.keys(req['cookies']).length ? 'cookie ' : ''} 
      ${ Object.keys(req['body']).length ? 'body' : '' })- ${req.url}`
  );
  if (Object.keys(req['cookies']).length) console.dir(req.cookies);
  if (Object.keys(req['query']).length) console.dir(req.query);
  if (Object.keys(req['body']).length) console.dir(req.body);
  next();
});

// CORS Policy
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));


// Current SERVER MODE 
var PREFIX = '/api';
const point = (URL) => `${PREFIX}${URL}`;

// USE DUMMY Routing
app.use(require('./dummies')(PREFIX));

// MVC pattern - Routes
const controller = require('./controller/');
// deployment
app.post(point('/deploy'), controller.deploy);
app.post(point('/upload'), controller.upload);

//Not Found : show Available routes
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// open port : HTTP/2
const server = http2.createSecureServer(options, app);
server.listen(3333, () => {
  console.log('Server is running on port 3333');
});

// open port : HTTP/1.1
// app.listen(3333, () => {
//   console.log('Server is running on port 3333');
// });
