'use strict';

import { ADD_TODO, REMOVE_TODO } from '../constants/ActionsTypes';


export function addTodo(text) {
	return {
		type: ADD_TODO,
		text
	};
}

export function removeTodo(index) {
	return {
		type: REMOVE_TODO,
		index
	};
}

