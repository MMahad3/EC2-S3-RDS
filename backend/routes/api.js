// Import Dependencies 
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/todos', (req, res, next) => {
  Todo.find({}, 'action') // finds all the documents, selecting only the action field 
    .then(data => res.json(data))
    .catch(next);
});

router.post('/todos', (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty"    
    });
  }
});

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next);
});

router.put('/todos/:id', (req, res, next) => {
  if (req.body.action) {
    Todo.findByIdAndUpdate(
      req.params.id,
      { action: req.body.action },
      { new: true } // Return the updated document
    )
    .then(data => res.json(data))
    .catch(next);
  } else {
    res.json({ error: "The input field is empty" });
  }
});


module.exports = router;
