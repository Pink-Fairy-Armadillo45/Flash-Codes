const flashcardController = {};
const db = require('../db/db'); 


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
    console.log('does this happen');
  const body = req.body.categories;
  console.log(Array.isArray(body));
  let query = `
   SELECT *
   FROM flash_cards
   `
   //if no category specified, return all flashcards
   console.log(body, body.length === 0);
   if(body.length === 0){
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
     console.log('has category', query);
     let categorySelect = 'WHERE ';
     body.forEach((category, index) => {
       if(index === body.length - 1){
         categorySelect = categorySelect.concat(`category=$${index+1};`);
       } else {
         categorySelect = categorySelect.concat(`category=$${index+1} OR `);
       }
     });
     query = query.concat(categorySelect);
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

// flashcardController.getCardsByCategory = (req, res, next) => {
//   const category = req.params.category;
//   console.log(category);
//   const query = `
//   SELECT *
//   FROM flash_cards
//   WHERE category = $1;
//   `
//   db.query(query, [category])
//   .then(response => {
//     res.locals.cardsByCategory = response.rows;
//     return next();
//   })
//   .catch(err => {
//     console.log('ERROR IN getCardsByCategory', err);
//     return next(err);
//   })
// }

module.exports = flashcardController;