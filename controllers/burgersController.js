const express = require('express');

const router = express.Router();

// Import the model (burgers.js) to use its database functions.
const burgers = require('../models/burgers.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
  burgers.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burger', (req, res) => {
  burgers.create(['name', 'devour'], [req.body.name, req.body.devour], (result) => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put('/api/burger/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burgers.update(
    {
      devour: req.body.devour,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/api/burger/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  burgers.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
