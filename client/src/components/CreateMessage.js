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
    const {activeImpulseId, activeSparkId, activeThreadId,
      impulses, sparks, threads} = this.props;
    const { createMessage } = this.props;

    const activeImpulse = impulses[activeImpulseId];
    const activeSpark = sparks[activeSparkId];
    const activeThread = threads[activeThreadId];

    e.preventDefault();

    createMessage(
      activeImpulse.id,
      activeSpark.id,
      activeThread.id,
      this.state.body,
      false
    );

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
    activeImpulseId: state.control.activeImpulseId,
    activeSparkId: state.control.activeSparkId,
    activeThreadId: state.control.activeThreadId,
    impulses: state.data.impulses,
    sparks: state.data.sparks,
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps, {
  createMessage
})(CreateMessage);
