import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

//Parent component and set initial state
//Pass down the state values to ToDo component
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the dog', isCompleted: true },
        { description: 'Clean up kitchen', isCompleted: false},
        { description: "Buy ingredients for tonight's dinner", isCompleted: false }
      ],
      newTodoDescription: ''
    }
  }

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false};
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  //Event handler
  toggleComplete(index) {
    //make copy of array in order to modify the data
    const todos = this.state.todos.slice();
    const todo = todos[index];
    // revisit the structure of ternery function
    todo.isCompleted = todo.isCompleted ? false : true;
    // revisit why todos: todos
    this.setState({ todos: todos });
  }


  render() {
    return (
      <div className="App">
        <ul>
          { this.state.todos.map( (todo, index) =>
              // Pass anonymous function to toggleComplete
              // Index allows us to select appropriate todo
              <ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } />
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <input type='text' value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
