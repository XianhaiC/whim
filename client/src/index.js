import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter } from 'react-router-dom';

import { API_WS_ROOT } from './constants'
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ActionCableProvider>,
  document.getElementById('root')
);
