import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { API_ROOT, HEADERS, UNDEFINED, PATH_ROOT, PATH_INVITE, 
  PATH_INVALID_INVITE, PATH_BOARD } from './constants';
import { exists } from './components/helpers';
import ImpulseManager from './components/ImpulseManager';
import Landing from './components/Landing'
import InvalidInvite from './components/InvalidInvite';

class App extends Component { 
  constructor() {
    super();
    this.state = {
      account_id: null,
      active_impulse: null,
      invite_hash: null,
      invited_impulse: null,
      invalid_hash: false
    }
    
    this.parseInvite = this.parseInvite.bind(this);
    this.handleImpulseJoined = this.handleImpulseJoined.bind(this);
    this.renderImpulseManager = this.renderImpulseManager.bind(this);
    this.renderLanding = this.renderLanding.bind(this);
  }

  parseInvite(props) {
    fetch(`${API_ROOT}/impulses/invite/${props.match.params.hash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(impulse => {
      console.log(impulse);
      if (!exists(impulse.id)) {
        // redirect to error page
        this.setState({ invalid_hash: true });
      }
      else {
        this.setState({ 
          invite_hash: props.match.params.hash,
          invited_impulse: impulse   
        });
      }
    });
  }


  handleImpulseJoined(impulse) {
    console.log(impulse);
    this.setState({ invited_impulse: impulse });
  }

  renderImpulseManager(props) {
    return (<ImpulseManager 
      invite_hash={this.state.invite_hash} 
      invited_impulse={this.state.invited_impulse} />
    )
  }

  renderLanding(props) {
    return <Landing onImpulseJoined={this.handleImpulseJoined} />
  }

  renderRedirect() {
    if (this.state.invalid_hash) return <Redirect to={PATH_INVALID_INVITE} />
    if (this.state.invite_hash 
      || this.state.invited_impulse) return <Redirect to={PATH_BOARD} />
  }

  render() {
    return ( 
      <div className="App">
        {this.renderRedirect()}
        <Switch>
          <Route exact path={PATH_ROOT} render={this.renderLanding} />
          //<Route exact path={PATH_BOARD} render={this.renderImpulseManager} />
          <Route path={PATH_INVITE} render={this.parseInvite} />
          <Route exact path={PATH_INVALID_INVITE} component={InvalidInvite} />
        </Switch>
      </div> 
    );
  }
}

export default App;
