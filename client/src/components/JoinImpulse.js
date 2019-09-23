import React from 'react';
import { connect } from 'react-redux';

import { joinImpulse } from '../actions/index';

class JoinImpulse extends React.Component {
  constructor() {
    super();

    this.state = {
      impulseHash: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({impulseHash: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.joinImpulse(this.state.impulseHash);

    this.setState({impulseHash: ''});
  }

  render() {
    return (
      <div className="join-impulse">
        <form onSubmit={this.handleSubmit}>
          { this.props.invalidHashError && <p>Invalid hash!</p> }
          <label>Enter the code for the Impulse.</label>
          <br />
          <input 
            type="text"
            value={this.state.impulseHash}
            onChange={this.handleChange}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invalidHashError: state.control.invalidHashError
  };
};

export default connect(mapStateToProps, {
  joinImpulse
})(JoinImpulse);
