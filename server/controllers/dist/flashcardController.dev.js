"use strict";

var flashcardController = {};

var db = require('../db/db');

var _require = require('uuid'),
    uuidv4 = _require.v4; // middleware to get all cards 


flashcardController.getAllPublicCards = function (req, res, next) {
  var body = req.body.categories;
  var query = "\n        SELECT *\n        FROM flash_cards\n        WHERE flash_cards.is_public = 'true' \n        "; // copied from getUserCardsByCategory

  var userID = req.body.userID; //if no category specified, return all flashcards belonging to the user or if are public

  if (body.length === 0) {
    // console.log(body, body.length === 0);
    query += 'OR flash_cards.created_by_id=$1;'; // console.log(query);

    db.query(query, [userID]).then(function (response) {
      res.locals.cards = response.rows;
      console.log('getAllPublicCards - no categories selected - res.locals.cards: ', res.locals.cards);
      return next();
    })["catch"](function (error) {
      console.log('ERROR IN getAllPublicCards(get all public categories): ', error);
      return next({
        log: error,
        message: {
          err: 'Error accessing database - see server logs'
        }
      });
    });
  } // categories selected: return flashcards where category matches
  else {
      body.push(req.body.userID);
      var categorySelect = 'OR ';

      for (var i = 0; i < body.length - 1; i++) {
        if (i === body.length - 2) {
          categorySelect = categorySelect.concat("category=$".concat(i + 1, " AND flash_cards.created_by_id=$").concat(body.length, ";"));
        } else {
          categorySelect = categorySelect.concat("category=$".concat(i + 1, " AND flash_cards.created_by_id=$").concat(body.length, " OR "));
        }
      }

      query = query.concat(categorySelect);
      db.query(query, body).then(function (response) {
        res.locals.cards = response.rows;
        return next();
      })["catch"](function (error) {
        // console.log('ERROR in getAllPublicCards(category selected): ', error);
        return next({
          log: error,
          message: {
            err: 'Error accessing database - see server logs'
          }
        });
      });
    }

  ;
}; // middleware to get cards by category
// Request data: request body will have multiple categories 
// TODO: create logic to generate query string based on number of categories sent back


flashcardController.getUserCardsByCategory = function (req, res, next) {
  var body = req.body.categories; // console.log(req.body.categories)
  // console.log('Getting cards by category: ', body);
  // console.log(Array.isArray(body));

  var query = "\n   SELECT *\n   FROM flash_cards \n   ";
  var userID = req.body.userID;

  if (body.length === 0) {
    query += 'WHERE flash_cards.created_by_id=$1;';
    db.query(query, [userID]).then(function (response) {
      res.locals.cards = response.rows;
      console.log('getCardsByCategory - no categories selected - res.locals.cards: ', res.locals.cards);
      return next();
    })["catch"](function (error) {
      console.log('ERROR IN getCardsByCategory(get all categories): ', error);
      return next({
        log: error,
        message: {
          err: 'Error accessing database - see server logs'
        }
      });
    });
  } // categories selected: return flashcards where category matches
  else {
      body.push(req.body.userID);
      var categorySelect = 'WHERE ';

      for (var i = 0; i < body.length - 1; i++) {
        if (i === body.length - 2) {
          categorySelect = categorySelect.concat("category=$".concat(i + 1, " AND flash_cards.created_by_id=$").concat(body.length, ";"));
        } else {
          categorySelect = categorySelect.concat("category=$".concat(i + 1, " AND flash_cards.created_by_id=$").concat(body.length, " OR "));
        }
      }

      query = query.concat(categorySelect);
      db.query(query, body).then(function (response) {
        res.locals.cards = response.rows;
        return next();
      })["catch"](function (error) {
        return next({
          log: error,
          message: {
            err: 'Error accessing database - see server logs'
          }
        });
      });
    }

  ;
}; // req.body: userID and flashcardID
// if answered correctly -> increment global total(query for flashcard -> increment global total -> insert into db), 
// -> increment correct_num in uses_in_cards table(query for matching row in users/cards table -> if not exist, insert. if exist update)


flashcardController.incrementGlobalTotal = function _callee(req, res, next) {
  var flashcardid, newGlobalTotal, query1, query2;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          flashcardid = req.body.flashCardID;
          newGlobalTotal = 0; //query for flashcard using cardid

          query1 = "\n    SELECT *\n    FROM flash_cards\n    WHERE _id=$1;";
          _context.next = 5;
          return regeneratorRuntime.awrap(db.query(query1, [flashcardid]).then(function (response) {
            var currentGlobalTotal = response.rows[0].global_total;
            newGlobalTotal = Number(currentGlobalTotal) + 1;
          })["catch"](function (error) {
            return next({
              log: error,
              message: error
            });
          }));

        case 5:
          //get current global total and increment
          //query to insert flashcard using cardid and global total
          query2 = "\n    UPDATE flash_cards\n    SET global_total=$1\n    WHERE _id=$2";
          _context.next = 8;
          return regeneratorRuntime.awrap(db.query(query2, [newGlobalTotal, flashcardid]).then(function (response) {
            return next();
          })["catch"](function (error) {
            return next({
              log: error,
              message: error
            });
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}; // req.body: userID and cardID
// increment correct in user/cards table 


flashcardController.correct = function _callee2(req, res, next) {
  var cardId, userId, newCorrect, newEntry, query, createQuery, id, updateQuery;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cardId = req.body.flashCardID;
          userId = req.body.userID;
          newCorrect = 1;
          newEntry = false; // query with double inner join to get corresponding row

          query = "\n  SELECT uc._id, uc.user_id, uc.flashcard_id, correct_num, incorrect_num, f.global_total FROM users_in_cards uc\n  INNER JOIN users u\n  ON uc.user_id = u._id\n  INNER JOIN flash_cards f\n  ON uc.flashcard_id = f._id\n  WHERE uc.user_id = $1 AND uc.flashcard_id = $2\n  ";
          _context2.next = 7;
          return regeneratorRuntime.awrap(db.query(query, [userId, cardId]).then(function (response) {
            // console.log(response.rows);
            if (response.rows.length === 0) {
              newEntry = true;
            } // increment correct_num
            else {
                newEntry = false;
                newCorrect = Number(response.rows[0].correct_num) + 1;
              }
          })["catch"](function (err) {
            console.log('error in doublejoin', err);
            return next(err);
          }));

        case 7:
          if (!newEntry) {
            _context2.next = 14;
            break;
          }

          createQuery = "\n    INSERT INTO users_in_cards\n    VALUES ($1, $2, $3, 1, 0);\n    ";
          id = uuidv4();
          _context2.next = 12;
          return regeneratorRuntime.awrap(db.query(createQuery, [id, userId, cardId]).then(function (response) {
            return next();
          })["catch"](function (error) {
            console.log('Error in creating new row in user/cards table');
            return next(error);
          }));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          updateQuery = "\n      UPDATE users_in_cards\n      SET correct_num = $1\n      WHERE user_id = $2 AND flashcard_id = $3\n    ";
          _context2.next = 17;
          return regeneratorRuntime.awrap(db.query(updateQuery, [newCorrect, userId, cardId]).then(function (response) {
            return next();
          })["catch"](function (error) {
            console.log('Error in update existing correct num');
            return next(error);
          }));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
};

flashcardController.incorrect = function _callee3(req, res, next) {
  var cardId, userId, newIncorrect, newEntry, query, createQuery, id, updateQuery;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          cardId = req.body.flashCardID;
          userId = req.body.userID;
          newIncorrect = 1;
          newEntry = false; // query with double inner join to get corresponding row

          query = "\n  SELECT uc._id, uc.user_id, uc.flashcard_id, correct_num, incorrect_num, f.global_total FROM users_in_cards uc\n  INNER JOIN users u\n  ON uc.user_id = u._id\n  INNER JOIN flash_cards f\n  ON uc.flashcard_id = f._id\n  WHERE uc.user_id = $1 AND uc.flashcard_id = $2\n  ";
          _context3.next = 7;
          return regeneratorRuntime.awrap(db.query(query, [userId, cardId]).then(function (response) {
            // console.log(response.rows);
            if (response.rows.length === 0) {
              newEntry = true;
            } // increment correct_num
            else {
                newEntry = false;
                newIncorrect = Number(response.rows[0].incorrect_num) + 1;
              }
          })["catch"](function (err) {
            console.log('error in doublejoin', err);
            return next(err);
          }));

        case 7:
          if (!newEntry) {
            _context3.next = 14;
            break;
          }

          createQuery = "\n    INSERT INTO users_in_cards\n    VALUES ($1, $2, $3, 1, 0);\n    ";
          id = uuidv4();
          _context3.next = 12;
          return regeneratorRuntime.awrap(db.query(createQuery, [id, userId, cardId]).then(function (response) {
            return next();
          })["catch"](function (error) {
            console.log('Error in creating new row in user/cards table');
            return next(error);
          }));

        case 12:
          _context3.next = 17;
          break;

        case 14:
          updateQuery = "\n      UPDATE users_in_cards\n      SET incorrect_num = $1\n      WHERE user_id = $2 AND flashcard_id = $3\n    ";
          _context3.next = 17;
          return regeneratorRuntime.awrap(db.query(updateQuery, [newIncorrect, userId, cardId]).then(function (response) {
            return next();
          })["catch"](function (error) {
            console.log('Error in update existing correct num');
            return next(error);
          }));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
};

flashcardController.createCard = function (req, res, next) {
  var problem = req.body.problem;
  var answer = req.body.answer;
  var username = req.body.username;
  var id = uuidv4();
  var category = req.body.category;
  var userID = req.body.userID;
  var is_public = req.body.is_public;
  console.log("flashcardcontroller ", is_public);
  var query = "\n  INSERT INTO flash_cards (_id, problem, answer, global_total, category, created_by, is_public, created_by_id)\n  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);\n  ";
  db.query(query, [id, problem, answer, '0', category, username, is_public, userID]).then(function (response) {
    res.locals.newCard = response.rows[0];
    return next();
  })["catch"](function (error) {
    console.log('Error in creating card:', error);
    return next(error);
  });
};

module.exports = flashcardController;