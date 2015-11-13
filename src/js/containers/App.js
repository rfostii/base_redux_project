'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';


class App extends Component {
	render() {
		const { todos, actions } = this.props;
		
		return (
			<div>
				<AddTodo 
					onAddClick={text => {
						actions.addTodo(text);
					}} 
				/>
				<TodoList 
					todos={todos}
					onTodoClick={index => {
						actions.removeTodo(index);
					}}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		todos: state.todos
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);