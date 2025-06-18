const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // import Sequelize instance

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
