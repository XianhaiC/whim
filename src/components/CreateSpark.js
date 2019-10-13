import React from 'react';
import { connect } from 'react-redux';

import { createSpark } from '../actions/index';

class CreateSpark extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      linkImmediately: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const linkAccountId = this.state.linkImmediately ? this.props.accountId : null;

    this.props.createSpark(this.state.name, this.props.activeImpulseId, linkAccountId);
  }

  render() {
    return (
      <div className="new-impulse">
        <div className="new-impulse-header">
          <h3 className="new-impulse-title">Create a spark</h3>
        </div>
        <form>
          <div className="new-impulse-fill">
            <label>Create a name for your spark!</label>
            <input
              className="new-impulse-text"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Enter a name..." />
          </div>
          <button className="new-impulse-submit"
            onClick={this.handleSubmit}>Start brainstorming!</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    accountId: state.session.accountId,
    activeImpulseId: state.control.activeImpulseId,
  };
};

export default connect(mapStateToProps, {
  createSpark
})(CreateSpark);
