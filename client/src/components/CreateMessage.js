import React from 'react';
import { connect } from 'react-redux';

import { createMessage } from '../actions/index';

class CreateMessage extends React.Component {
  constructor() {
    super();

    this.state = {
      body: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    const { activeImpulse, activeSpark, activeThread } = this.props;
    const { createMessage } = this.props;

    e.preventDefault();

    createMessage(activeImpulse,
      activeSpark,
      activeThread,
      this.state.body);

    this.setState({ body: '' });
  }

  render() {
    return (
      <div className="create-message">
        <form onSubmit={this.handleSubmit}>
          <input className="message-text"
            type="text"
            value={this.state.body}
            onChange={this.handleChange}/>
          <input className="message-submit" type="submit"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeImpulse: state.control.activeImpulse,
    activeSpark: state.control.activeSpark,
    activeThread: state.control.activeThread
  };
};

export default connect(mapStateToProps, {
  createMessage
})(CreateMessage);
