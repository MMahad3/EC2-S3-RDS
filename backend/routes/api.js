// Import Dependencies 
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// GET all todos
router.get('/todos', async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ attributes: ['id', 'action'] }); // MySQL equivalent
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

// POST a new todo
router.post('/todos', async (req, res, next) => {
  console.log("Received POST /todos:", req.body); 
  try {
    const { action } = req.body;
    if (action) {
      const newTodo = await Todo.create({ action });
      res.status(201).json(newTodo);
    } else {
      res.json({ error: "The input field is empty" });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE a todo by ID
router.delete('/todos/:id', async (req, res, next) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    next(err);
  }
});

// UPDATE a todo by ID
router.put('/todos/:id', async (req, res, next) => {
  try {
    const { action } = req.body;
    if (action) {
      const [updated] = await Todo.update(
        { action },
        { where: { id: req.params.id } }
      );
      if (updated) {
        const updatedTodo = await Todo.findByPk(req.params.id);
        res.json(updatedTodo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } else {
      res.json({ error: "The input field is empty" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
