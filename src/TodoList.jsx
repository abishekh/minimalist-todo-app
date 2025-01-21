// TodoList.jsx
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Some run', completed: true, priority: true },
    { id: 2, text: 'Read 10 pages', completed: false },
    { id: 3, text: 'Walk the dog', completed: false },
    { id: 4, text: 'Get groceries', completed: false },
    { id: 5, text: 'Design a to-do app(?)', completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTodoText.trim()) {
      const newTodo = {
        id: todos.length + 1,
        text: newTodoText.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div 
          key={todo.id} 
          className="todo-item"
          onClick={() => toggleTodo(todo.id)}
        >
          <div className={`checkbox ${todo.completed ? 'checked' : ''}`} />
          {todo.priority && <div className="priority-dot" />}
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
        </div>
      ))}
      <div className="todo-item new-todo">
        <div className="checkbox" />
        <input
          name="input"  
          type="text"
          className="todo-input"
          placeholder="Add new task"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default TodoList;
