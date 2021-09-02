"use strict";

var express = require('express');

var flashcardController = require('../controllers/flashcardController');

var router = express.Router(); // post request for all of user's cards of multiple categories

router.post('/category/', flashcardController.getUserCardsByCategory, function (req, res) {
  return res.status(200).json(res.locals.cards);
}); // post request for all of the public + user cards of multiple categories

router.post('/publicCards', flashcardController.getAllPublicCards, function (req, res) {
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