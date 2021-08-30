// import uuid module to generate unique user ids
const { v4: uuidv4 } = require('uuid');
// import db
const db = require('../db/db');
// create object to hold userController methods (middleware) 
const userController = {};

// Only creates entry in User table
userController.createUser = (req, res, next) => {
  if(res.locals.userExists) {
    return next();
  }
  // deconstruct req.body to get username, password
  const username = req.body.username;
  const password = req.body.password;
  // generate _id using uuid
  const id = uuidv4();
  console.log(id);
  // create sql query to INSERT new user INTO the psql db
  const query = `
  INSERT INTO users (_id, username, password)
  SELECT $1, $2, $3;
  `;
  // should we write logic to check if username already exist inside db? this can be a stretch goal?
  db.query(query, [id, username, password])
  .then((response) => {
    return next();
  })
  .catch(error => {
    console.log('ERROR in createUser: ', error);
    return next({
       log: error,
       message: {err: 'Error accessing database for user'}
     })
   })
  // query db to insert new user into db
    // return next if query is successful
    // return next(error obj) if query fails

}

userController.checkUserExists = (req, res, next) => {
  const username = req.body.username;
  const query = `
  SELECT * FROM users WHERE username=$1;
  `;
  // if user is found, return an error. If query error, continue next
  db.query(query, [username])
  .then((response) => {
    if(response.rows.length === 0){
      res.locals.userExists = false;
      return next();
    }
      res.locals.userExists = true; 
    // return res.status(200).send(res.locals.user);
    return next();
  })

}

// checks for matching entry in user table
userController.verifyUser = (req, res, next) => {
    // deconstruct req.body to get username input and password input
    const username = req.body.username;
    const password = req.body.password;
    const query = `
        SELECT *
        FROM users
        WHERE username=$1 AND password=$2`;
    // query db to find username and password combo
    db.query(query)
        .then(response => next())
        .catch(error => next({
            log: error,
            message: error
        }));
}

module.exports = userController;