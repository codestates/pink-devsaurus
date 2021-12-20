const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

/* route config */
const sessionRouter = require('./routes/session')
const usersRouter = require('./routes/users')
const categoryRouter = require('./routes/category')
const questionRouter = require('./routes/questions')
const answerRouter = require('./routes/answer')
const likeRouter = require('./routes/like')

/* middleware */
app.use(express.json());
app.use(cookieParser());

/* Route */
app.use('/', sessionRouter)
app.use('/users', usersRouter);
app.use('/categorys', categoryRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);
app.use('/likes',likeRouter);

/* example http server run */
const HTTPS_PORT = 8000
app.listen(HTTPS_PORT, () => console.log('http Server Running : http://localhost:',HTTPS_PORT))