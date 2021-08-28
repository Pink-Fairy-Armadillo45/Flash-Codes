const express = require('express');
const flashcardController = require('../controllers/flashcardController');
const router = express.Router();

// get request to retrieve all cards from flashcard database
router.get('/getCards/', flashcardController.getAllCards, (req, res) => {
  return res.status(200).json(res.locals.cards);
})

// get request for all cards of a multiple category

router.get('/category/', flashcardController.getCardsByCategory, (req, res) => {
  return res.status(200).json(res.locals.cards);
})

//random order get cards

//
module.exports = router;