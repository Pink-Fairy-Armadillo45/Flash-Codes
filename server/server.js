const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const cardsRouter = require('./routers/flashcardRouter.js');
const userRouter = require('./routers/userRouter.js');
require('dotenv').config();

// handle parsing body and url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/cards/', cardsRouter);
app.use('/user/', userRouter);

// serve static pages
app.use(express.static(path.resolve(__dirname, '../client')));

// 404 handler
app.use((req, res) => res.status(404).send('Error 404: Page not found (what did u do smh)'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).send(errorObj.message.err)
})

//begin listening on port
app.listen(PORT, () => console.log('Listening on port:', PORT));
