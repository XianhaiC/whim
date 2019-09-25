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
      <div className="new-impulse">
        <div className="new-impulse-header">
          <h3 className="new-impulse-title">Join an impulse</h3>
        </div>
        <form>
          <div className="new-impulse-fill">
            <label>Impulse code</label>
            <input
              className="new-impulse-text"
              type="text"
              value={this.state.impulseHash}
              onChange={this.handleChange}
              placeholder="Enter code..." />
          </div>
          <button className="new-impulse-submit"
            onClick={this.handleSubmit}>Join</button>
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
