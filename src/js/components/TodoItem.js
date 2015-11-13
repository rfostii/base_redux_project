'use strict';

import React, { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
	render() {
		return (
			<li 
				onClick={this.props.onClick}
			>
				{this.props.text}
			</li>
		)
	}
}

TodoItem.propTypes = {
	onClick: PropTypes.func.isRequired
}