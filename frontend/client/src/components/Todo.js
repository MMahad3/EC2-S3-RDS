import React, { Component } from 'react';
import axios from 'axios';

import Input from './Input';
import ListTodo from './ListTodo';

class Todo extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios.get('/api/todos') 
      .then(res => {
        if (res.data) {
          this.setState({
            todos: res.data
          });
        }
      })
      .catch(err => console.log(err));
  };

  deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(res => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch(err => console.log(err));
  };

  updateTodo = (id, newAction) => {
  axios.put(`/api/todos/${id}`, { action: newAction })
    .then(res => {
      if (res.data) {
        this.getTodos();
      }
    })
    .catch(err => console.log(err));
};


  render() {
  const { todos } = this.state;

  return (
    <div>
      <h1 className="todo-heading">Todo App</h1>
      <Input getTodos={this.getTodos} />
      <ListTodo
        todos={todos}
        deleteTodo={this.deleteTodo}
        updateTodo={this.updateTodo}
      />
    </div>
  );
}

}

export default Todo;
