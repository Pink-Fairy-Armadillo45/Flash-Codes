"use strict";

var express = require('express');

var flashcardController = require('../controllers/flashcardController');

var router = express.Router(); // get request to retrieve user's cards from the flashcard database
// router.get('/getUserCards/', flashcardController.getUserCards, (req, res) => {
//   return res.status(200).json(res.locals.userCards);
// })
// // get request to retrieve all cards from flashcard database
// router.get('/getCards/', flashcardController.getAllCards, (req, res) => {
//   return res.status(200).json(res.locals.cards);
// })
// get request for all cards of a multiple category

router.post('/category/', flashcardController.getUserCardsByCategory, function (req, res) {
  return res.status(200).json(res.locals.cards);
}); // req body: userid and cardid 
// if answered correctly -> increment global total(query for flashcard -> increment global total -> insert into db), 
// -> increment correct_num in uses_in_cards table(query for matching row in users/cards table -> if not exist, insert. if exist update)

router.post('/answeredCorrect', flashcardController.incrementGlobalTotal, flashcardController.correct, function (req, res) {
  return res.status(200).send();
}); // if answered incorrectly -> increment global total, -> increment incorrect_num in uses_in_cards table

router.post('/answeredIncorrect', flashcardController.incrementGlobalTotal, flashcardController.incorrect, function (req, res) {
  return res.status(200).send();
});
router.post('/create', flashcardController.createCard, function (req, res) {
  return res.status(200).json(res.locals.newCard);
});
module.exports = router;