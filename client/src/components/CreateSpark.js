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
      <div className="create-spark">
        <form onSubmit={this.handleSubmit}>
          <label>Enter a name!</label>
            <br />
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input type="submit" />
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
