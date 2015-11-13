'use strict';

import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
	render() {
		return (
			<ul>
				{this.props.todos.map((todo, index) => 
					<TodoItem {...todo}
						key={index}
						onClick={() => this.props.onTodoClick(index)}
					/>
				)}
			</ul>
		)
	}
}

TodoList.propTypes = {
	onTodoClick: PropTypes.func.isRequired
}