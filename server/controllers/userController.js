const bcrypt = require('bcrypt');
const saltRounds = 8;
const axios = require('axios');
require('dotenv').config();

// import uuid module to generate unique user ids
const { v4: uuidv4 } = require('uuid');
// import db
const db = require('../db/db');
// create object to hold userController methods (middleware) 
const userController = {};

// Only creates entry in User table
userController.createUser = (req, res, next) => {
  if (res.locals.userExists) {
    return next();
  }
  // deconstruct req.body to get username, password
  if (res.locals.username && res.locals.userID) {
    req.body.username = res.locals.username;
    req.body.password = res.locals.userID;
  }
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds)
    .then((encryptedPassword) => {
      console.log('encrypted password:', encryptedPassword);
      // generate _id using uuid
      const id = uuidv4();
      console.log('uuid: ', id);

      // create sql query to INSERT new user INTO the psql db
      const query = `
    INSERT INTO users (_id, username, password)
    SELECT $1, $2, $3;
    `;

      db.query(query, [id, username, encryptedPassword])
        .then((response) => {
          res.locals.userID = id;
          return next();
        })
        .catch(error => {
          console.log('ERROR in createUser: ', error);
          return next({
            log: error,
            message: { err: 'Error accessing database for user' }
          })
        })
    })
    .catch(error => {
      console.log('ERROR in bcrypt: ', error);
      return next({
        log: error,
        message: { err: 'Error accessing database for user' }
      })
    })

  // query db to insert new user into db
  // return next if query is successful
  // return next(error obj) if query fails

}

userController.checkOauthExists = (req, res, next) => {
  const username = res.locals.username;
  const query = `SELECT * FROM users WHERE username=$1;`;
  // if user is found, return an error. If query error, continue next
  db.query(query, [username])
    .then((response) => {
      if (response.rows.length === 0) {
        res.locals.userExists = false;
        return next();
      }
      res.locals.userExists = true;
      // return res.status(200).send(res.locals.user);
      return next();
    })
}

userController.checkUserExists = (req, res, next) => {
  const username = req.body.username;
  const query = `SELECT * FROM users WHERE username=$1;`;
  // if user is found, return an error. If query error, continue next
  db.query(query, [username])
    .then((response) => {
      if (response.rows.length === 0) {
        res.locals.userExists = false;
        return next();
      }
      res.locals.userExists = true;
      // return res.status(200).send(res.locals.user);
      return next();
    })
}

// checks for matching entry in user table
userController.verifyUser = async (req, res, next) => {
  if (res.locals.username && res.locals.userID) {
    req.body.username = res.locals.username;
    req.body.password = res.locals.userID;
  }
  // deconstruct req.body to get username input and password input
  const username = req.body.username;
  const password = req.body.password;

  // console.log(encryptedPassword)
  const query = `
          SELECT *
          FROM users
          WHERE username=$1;
          `;
  // query db to find username and password combo
  try {
    const user = await db.query(query, [username]);
    // console.log("User found: ", user);

    const comparison = await bcrypt.compare(password, user.rows[0].password);
    console.log(comparison);
    if (comparison) {
      res.locals.password = user.rows[0].password;
      res.locals.userID = user.rows[0]._id;
      return next();
    }
  } catch (error) {
    return next({
      log: error,
      message: error
    })
  }
}


const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

userController.oauthUser = async (req, res, next) => {
  console.log('make it to oauth redirect route');
  const requestToken = req.query.code;
  console.log('request token : ', requestToken);
  try {
    const response =
      await axios.post(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`)
    // console.log('response: ', response.data);
    const accessTokenArr = response.data.split(/[ &]+/);
    const accessToken = accessTokenArr[0].substring(13);
    console.log('accessToken: ', accessToken);
    res.locals.token = accessToken;
    console.log('finished it!')
    return next();
  } catch (err) {
    console.log('error in oauthUser', err);
  }

}

userController.fetchUser = async (req, res, next) => {
  console.log('Made it to fetchUser');
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        // This header informs the Github API about the API version
        // Include the token in the Authorization header
        Authorization: "token " + res.locals.token,
      },
    })
    console.log(response.data)
    console.log('login: ', response.data.login);
    console.log('node id: ', response.data.node_id);
    res.locals.userID = response.data.node_id;
    res.locals.username = response.data.login;
    return next();
  } catch (err) {
    console.log('Error found!', err)
  }
}

module.exports = userController;