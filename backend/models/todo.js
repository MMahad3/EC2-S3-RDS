//Import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // retrieves the mongoose schema constructor

// Defines the todo schema
const TodoSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The todo text field is required']
  }
});

// Create model for todo
const Todo = mongoose.model('todo', TodoSchema);

// exports the todo model to be used in other parts of the app.
module.exports = Todo;