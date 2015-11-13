'use strict';

import { List } from 'immutable';
import { ADD_TODO, REMOVE_TODO } from '../constants/ActionsTypes';

export default function todos(state = List(), action) {
	switch (action.type) {
		case ADD_TODO: 
			return list.push({
				text: action.text
			});
		case REMOVE_TODO:			
			return list.delete(action.index);
		default:
			return state;
	}
}