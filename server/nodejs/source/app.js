require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
let app, readFileSync, http2Express, https, options;

// HTTP Version check
if( process.env.HTTP_VERSION === 1.1 ) app = express();
else {
  readFileSync = require('fs').readFileSync;
  http2Express = require('http2-express-bridge');
  http2 = require('http2');
  app = http2Express(express);
  options = {
    key: readFileSync('/etc/nginx/cert/key.pem'),
    cert: readFileSync('/etc/nginx/cert/cert.pem'),
    allowHTTP1: true,
  };
}

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
const PREFIX = '/api';
const point = (URL) => `${PREFIX}${URL}`;

// USE DUMMY Routing
app.use(require('./dummies')(PREFIX));

// MVC pattern - Routes
const controller = require('./controller/');
// deployment
app.post(point('/upload'), controller.upload);

//Not Found : show Available routes
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});


// HTTP Version check
if( process.env.HTTP_VERSION === 1.1 ) {
  app.listen(3333, () => {
    console.log('HTTP/1.1 Server is running on port 3333');
  });
} else {
  const server = http2.createSecureServer(options, app);
  server.listen(3333, () => {
    console.log('HTTP/2.0 Server is running on port 3333');
  });
}
