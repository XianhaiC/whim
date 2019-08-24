import React, {Component} from 'react';

import ImpulseManager from './components/ImpulseManager';

import logo from './logo.svg';

class App extends Component { 
  state = {
    'account_id': null,
    'active_impulse': null
  }

  render() {
    return ( 
      <div className="App">
        <ImpulseManager />
      </div> 
    );
  }
}

export default App;
