const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // import Sequelize instance

const Todo = sequelize.define('Todo', {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'The todo text field is required'
      }
    }
  }
}, {
  tableName: 'todos'
});

module.exports = Todo;
