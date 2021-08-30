const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// post request to create user
router.post('/createUser/', userController.checkUserExists, userController.createUser, (req, res) => {
  if(res.locals.userExists){
    //if user exists, does not create user, responds with false
    return res.status(200).json(false);
  }
  //if user does not exist, creates user, responds with true
  return res.status(200).json(true);
})

// post request to authenticate user
router.post('/authUser/', userController.verifyUser, (req, res) => {
  return res.status(200).send();
  
})



module.exports = router;