const flashcardController = {};
const db = require('../db/db'); 
const { v4: uuidv4 } = require('uuid');


// middleware to get all cards 
flashcardController.getAllCards = (req, res, next) => {
    const query = `
        SELECT *
        FROM flash_cards;`;
    db.query(query)
        .then(response => {
            res.locals.cards = response.rows;
            return next();
        })
        .catch(error => {
            console.log('ERROR IN getAllCards: ', error);
            return next({
                log: error,
                message: {err: 'Error accessing database - see server logs'}
            })
        })
};

// middleware to get cards by category
// Request data: request body will have multiple categories 
// TODO: create logic to generate query string based on number of categories sent back

flashcardController.getCardsByCategory = (req, res, next) => {
  const body = req.body.categories;
  // console.log(req.body.categories)
  // console.log('Getting cards by category: ', body);
  // console.log(Array.isArray(body));
  let query = `
   SELECT *
   FROM flash_cards
   `
  //  console.log(body, body.length === 0);
   //if no category specified, return all flashcards
   if(body.length === 0){
      // console.log(body, body.length === 0);
     query += ';';
    db.query(query)
    .then(response => {
        res.locals.cards = response.rows;
        return next();
    })
    .catch(error => {
        console.log('ERROR IN getCardsByCategory(get all categories): ', error);
        return next({
            log: error,
            message: {err: 'Error accessing database - see server logs'}
        })
    })
   }
   // categories selected: return flashcards where category matches
   else {
     let categorySelect = 'WHERE ';
     body.forEach((category, index) => {
       if(index === body.length - 1){
         categorySelect = categorySelect.concat(`category=$${index+1};`);
        } else {
          categorySelect = categorySelect.concat(`category=$${index+1} OR `);
        }
      });
      query = query.concat(categorySelect);
      // console.log('has category', query);
     db.query(query, body)
     .then(response => {
       res.locals.cards = response.rows;
       return next();
     })
     .catch(error => {
       console.log('ERROR in getCardsByCategory(category selected): ', error);
       return next({
          log: error,
          message: {err: 'Error accessing database - see server logs'}
        })
      })
   };   
};

// req.body: userID and flashcardID
// if answered correctly -> increment global total(query for flashcard -> increment global total -> insert into db), 
// -> increment correct_num in uses_in_cards table(query for matching row in users/cards table -> if not exist, insert. if exist update)
flashcardController.incrementGlobalTotal = async (req, res, next) => {
  const flashcardid = req.body.flashCardID;
  let newGlobalTotal = 0;
  //query for flashcard using cardid
  const query1 = `
    SELECT *
    FROM flash_cards
    WHERE _id=$1;`;
  await db.query(query1, [flashcardid])
    .then(response => {
      const currentGlobalTotal = response.rows[0].global_total;
      newGlobalTotal = Number(currentGlobalTotal)+1;
    })
    .catch(error => next({
      log: error,
      message: error
    }))
  //get current global total and increment
  //query to insert flashcard using cardid and global total
  const query2 = `
    UPDATE flash_cards
    SET global_total=$1
    WHERE _id=$2`;
  await db.query(query2, [newGlobalTotal, flashcardid])
    .then(response => {
      return next();
    })
    .catch(error => next({
      log: error,
      message: error
    }))
}

// req.body: userID and cardID
// increment correct in user/cards table 
flashcardController.correct = async (req, res, next) => {
  const cardId = req.body.flashCardID;
  const userId = req.body.userID;
  let newCorrect = 1;
  let newEntry = false;
  // query with double inner join to get corresponding row
  const query = `
  SELECT uc._id, uc.user_id, uc.flashcard_id, correct_num, incorrect_num, f.global_total FROM users_in_cards uc
  INNER JOIN users u
  ON uc.user_id = u._id
  INNER JOIN flash_cards f
  ON uc.flashcard_id = f._id
  WHERE uc.user_id = $1 AND uc.flashcard_id = $2
  `;
  await db.query(query, [userId, cardId])
  .then( (response) => {
    // console.log(response.rows);
    if(response.rows.length === 0){
      newEntry = true;
    }
    // increment correct_num
    else {
      newEntry = false;
      newCorrect = Number(response.rows[0].correct_num) + 1;
    }
  })
  .catch(err => {
    console.log('error in doublejoin', err)
    return next(err);
  })

  if(newEntry){
    const createQuery = `
    INSERT INTO users_in_cards
    VALUES ($1, $2, $3, 1, 0);
    `
    const id = uuidv4();
    await db.query(createQuery, [id, userId, cardId])
    .then((response) => {
      return next();
    })
    .catch(error => {
      console.log('Error in creating new row in user/cards table');
      return next(error);
    })
  }
  // query update user/cards table with incremented correct num
  else {
    const updateQuery = `
      UPDATE users_in_cards
      SET correct_num = $1
      WHERE user_id = $2 AND flashcard_id = $3
    `;
  
    await db.query(updateQuery, [newCorrect, userId, cardId])
    .then((response) => {
      return next();
    })
    .catch(error => {
      console.log('Error in update existing correct num');
      return next(error);
    })
  }

}

flashcardController.incorrect = async (req, res, next) => {
  const cardId = req.body.flashCardID;
  const userId = req.body.userID;
  let newIncorrect = 1;
  let newEntry = false;
  // query with double inner join to get corresponding row
  const query = `
  SELECT uc._id, uc.user_id, uc.flashcard_id, correct_num, incorrect_num, f.global_total FROM users_in_cards uc
  INNER JOIN users u
  ON uc.user_id = u._id
  INNER JOIN flash_cards f
  ON uc.flashcard_id = f._id
  WHERE uc.user_id = $1 AND uc.flashcard_id = $2
  `;
  await db.query(query, [userId, cardId])
  .then( (response) => {
    // console.log(response.rows);
    if(response.rows.length === 0){
      newEntry = true;
    }
    // increment correct_num
    else {
      newEntry = false;
      newIncorrect = Number(response.rows[0].incorrect_num) + 1;
    }
  })
  .catch(err => {
    console.log('error in doublejoin', err)
    return next(err);
  })

  if(newEntry){
    const createQuery = `
    INSERT INTO users_in_cards
    VALUES ($1, $2, $3, 1, 0);
    `
    const id = uuidv4();
    await db.query(createQuery, [id, userId, cardId])
    .then((response) => {
      return next();
    })
    .catch(error => {
      console.log('Error in creating new row in user/cards table');
      return next(error);
    })
  }
  // query update user/cards table with incremented correct num
  else {
    const updateQuery = `
      UPDATE users_in_cards
      SET incorrect_num = $1
      WHERE user_id = $2 AND flashcard_id = $3
    `;
  
    await db.query(updateQuery, [newIncorrect, userId, cardId])
    .then((response) => {
      return next();
    })
    .catch(error => {
      console.log('Error in update existing correct num');
      return next(error);
    })
  }
}

flashcardController.createCard = (req, res, next) => {
  const problem = req.body.problem;
  const answer = req.body.answer;
  const username = req.body.username;
  const id = uuidv4();
  const category = req.body.category;

  const query = `
  INSERT INTO flash_cards (_id, problem, answer, global_total, category, created_by)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;
  db.query(query, [id, problem, answer, '0', category, username])
  .then((response) => {
    res.locals.newCard = response.rows[0];
    return next();
  })
  .catch((error) => {
    console.log('Error in creating card:', error);
    return next(error);
  })

}
module.exports = flashcardController;