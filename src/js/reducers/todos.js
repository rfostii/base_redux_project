'use strict';

import { ADD_TODO, REMOVE_TODO } from '../constants/ActionsTypes';

export default function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO: 
			return [
				...state,
				{
					text: action.text
				}
			];
		case REMOVE_TODO:
			state.splice(action.index, 1);
			return [...state];
		default:
			return state;
	}
}