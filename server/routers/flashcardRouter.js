const express = require('express');
const flashcardController = require('../controllers/flashcardController');
const router = express.Router();

// get request to retrieve all cards from flashcard database
router.get('/getCards/', flashcardController.getAllCards, (req, res) => {
  return res.status(200).json(res.locals.cards);
})

// get request for all cards of a multiple category

router.post('/category/', flashcardController.getCardsByCategory, (req, res) => {
  return res.status(200).json(res.locals.cards);
})

router.post('/answeredCorrect', (req, res) => {
  return res.status(200).send();
})

router.post('/answeredIncorrect', (req, res) => {
  return res.status(200).send();
})


module.exports = router;