import './App.css';
import React, { Component } from 'react';
import { CloseOutlined } from '@ant-design/icons';
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ''
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue, todos } = this.state;
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      this.setState({ todos: [...todos, newTodo], inputValue: '' });
    }
  }

  handleToggleComplete = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  handleDelete = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: updatedTodos });
  }

  render() {
    const { todos, inputValue } = this.state;

    return (
      <div>
        <h1 id='todo'>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input id='input' type="text" value={inputValue} onChange={this.handleChange} />
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input id='active'
                type="checkbox"
                checked={todo.completed}
                onChange={() => this.handleToggleComplete(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <button id='delete' onClick={() => this.handleDelete(todo.id)}><CloseOutlined /></button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;