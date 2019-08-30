import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PATH_ROOT, PATH_INVITE } from './constants';
import ImpulseManager from './components/ImpulseManager';

class App extends Component { 
  constructor() {
    super();
    this.state = {
      account_id: null,
      active_impulse: null,
      invite_hash: null
    }
    
    this.parseInvite = this.parseInvite.bind(this);
    this.passInvite = this.passInvite.bind(this);
  }

  parseInvite(props) {
    this.setState({ invite_hash: props.match.params.hash });
  }

  passInvite(props) {
    return <ImpulseManager invite_hash={this.state.invite_hash} />
  }

  renderRedirect() {
    if (this.state.invite_hash != null) {
      return <Redirect to={PATH_ROOT} />
    }
  }

  render() {
    return ( 
      <div className="App">
        {this.renderRedirect()}
        <Switch>
          <Route exact path='/' render={this.passInvite} />
          <Route path={PATH_INVITE} render={this.parseInvite} />
        </Switch>
      </div> 
    );
  }
}

export default App;
