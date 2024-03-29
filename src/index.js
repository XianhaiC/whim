import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { API_WS_ROOT } from './constants';
import App from './components/App';
import reducers from './reducers';
import history from './history';

export const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={API_WS_ROOT}>
      <Router history={history}>
        <App />
      </Router>
    </ActionCableProvider>
  </Provider>,
  document.getElementById('root')
);
