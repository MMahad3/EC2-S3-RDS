import React, { useState } from 'react';

const ListTodo = ({ todos, deleteTodo, updateTodo }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (todo) => {
    setEditId(todo._id);
    setEditText(todo.action);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (editText.trim()) {
      updateTodo(editId, editText);
      cancelEditing();
    }
  };

  return (
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo._id} className="todo-item">
  {editId === todo._id ? (
    <>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="edit-input"
      />
      <div className="button-group">
        <button className="save-btn" onClick={saveEdit}>Save</button>
        <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
      </div>
    </>
  ) : (
    <>
      <span className="todo-text">{todo.action}</span>
      <div className="button-group">
        <button className="edit-btn" onClick={() => startEditing(todo)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
      </div>
    </>
  )}
</li>

        ))
      ) : (
        <li>No todo(s) left</li>
      )}
    </ul>
  );
};

export default ListTodo;
