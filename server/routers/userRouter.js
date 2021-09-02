const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
require('dotenv').config();


const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
// post request to create user
router.post('/createUser/', userController.checkUserExists, userController.createUser, (req, res) => {
  if (res.locals.userExists) {
    //if user exists, does not create user, responds with false
    return res.status(200).json({ data: false });
  }
  //if user does not exist, creates user, responds with true
  return res.status(200).json({ data: true, userID: res.locals.userID });
})

// post request to authenticate user
router.post('/authUser/', userController.verifyUser, (req, res) => {
  return res.status(200).json({ userID: res.locals.userID });

})

router.get('/auth', (req, res) => {
  console.log('in /auth')
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost:8080/user/oauth`)
})

router.get('/oauth', userController.oauthUser, userController.fetchUser, userController.checkOauthExists, userController.createUser, userController.verifyUser, (req, res) => {
  return res.status(200).json({ username: res.locals.username, password: res.locals.password, userID: res.locals.userID })
  // return res.redirect('/');
})


module.exports = router;