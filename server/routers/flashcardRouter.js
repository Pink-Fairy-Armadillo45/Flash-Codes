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


// req body: userid and cardid 
// if answered correctly -> increment global total(query for flashcard -> increment global total -> insert into db), 
// -> increment correct_num in uses_in_cards table(query for matching row in users/cards table -> if not exist, insert. if exist update)
router.post('/answeredCorrect', flashcardController.incrementGlobalTotal, flashcardController.correct, (req, res) => {
  return res.status(200).send();
})

// if answered incorrectly -> increment global total, -> increment incorrect_num in uses_in_cards table
router.post('/answeredIncorrect', flashcardController.incrementGlobalTotal, flashcardController.incorrect, (req, res) => {
  return res.status(200).send();
})


module.exports = router;