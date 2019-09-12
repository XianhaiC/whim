import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import { API_WS_ROOT } from './constants'
import App from './App';

import './index.css';

export const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url={API_WS_ROOT}> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActionCableProvider>
    </Provider>,
  document.getElementById('root')
);
