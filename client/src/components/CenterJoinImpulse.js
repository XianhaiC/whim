import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { exists } from './helpers';

class CenterJoinImpulse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      impulse_hash: '',
      invalid_hash: false,
    };
    this.handle_impulse_hash = this.handle_impulse_hash.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
  }

  handle_impulse_hash = e => {
    this.setState({ impulse_hash: e.target.value });
  }


  handle_submit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/impulses/invite/${this.state.impulse_hash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(impulse => {
      if (exists(impulse.errors)) {
        this.setState({ invalid_hash: true });
      }
      else this.props.on_impulse_joined(impulse);
      return;
    });
  }

  render = () => {
    return (
      <div className="center_create_impulse">
        <form onSubmit={this.handle_submit}>
          { this.state.invalid_hash && <p>Invalid hash!</p> }
          <label>Enter the code for the Impulse.</label>
          <br />
          <input 
            type="text"
            value={this.state.impulse_hash}
            onChange={this.handle_impulse_hash}/>
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default CenterJoinImpulse;
