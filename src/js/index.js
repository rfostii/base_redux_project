'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoStore from './store/todosStore';


const rootElement = document.getElementById('app');
const store = todoStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);