import bodyParser from './utils/bodyParser.js';
import dummyDB from './dummies.js'

const dummy = (req, res) => {

  // ======================================================
  // default function wrapper for the njs -> express conversion
  // ======================================================
  const console = req; //console functions
  const process_env = req.variables; //dotenv : declare with js_var $VARIABLE value;
  req.rawbody = bodyParser(req); //bodyparser for token evaluation
  req.body = req.rawbody? JSON.parse(req.rawbody):{}; //bodyparser
  res = {
    status: (code) => {
      return {
        send: (data) => {
          req.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
          req.return(code, data);
        },
        json: (data) => {
          req.headersOut['Content-Type'] = 'application/json; charset=utf-8';
          req.return(code, JSON.stringify(data));
        },
      };
    },
    end : req.finish
  };
  req.header = (name) => {
    return req.headersIn[name];
  };
  req.ip = req.remoteAddress;
  req.cookies = require('querystring').parse(req.headersIn['Cookie'], '; ', '=');
  req.path = req.uri;
  req.url = req.uri;
  req.query = req.args;
  console.dir = function (obj) {
    console.log(typeof obj === 'object'? JSON.stringify(obj):obj);
  };
  // ======================================================

  //console.log(`req.header('Cookie') = ${JSON.stringify(req.cookies)}`);
  console.log(
    `[DUMMY] ${req.ip} ${req.method} -( ${Object.keys(req['cookies']).length ? 'cookie ' : ''} ${ Object.keys(req['body']).length ? 'body' : '' })- ${req.url}`
  );
  if (Object.keys(req['cookies']).length) console.dir(req.cookies);
  if (Object.keys(req['query']).length) console.dir(req.query);
  if (Object.keys(req['body']).length) console.dir(req.body);


  const PREFIX = '/' + req.url.split('/')[1]; //or '/dummy'
  if (
    !dummyDB.some((dummyInfo) => {
      const METHOD = dummyInfo[0], PATH = dummyInfo[1], STATUSCODE = dummyInfo[2], RETURN = dummyInfo[3];
      if (PREFIX + PATH === req.path && METHOD === req.method) {
        console.log(`[DUMMY] caught ${METHOD} ${PATH}. sent ${STATUSCODE}`);
        res.status(STATUSCODE).json(RETURN);
        return true;
      }
    })
  )
  res.status(404).send('Dummy : Not found');
};

export default { dummy };
