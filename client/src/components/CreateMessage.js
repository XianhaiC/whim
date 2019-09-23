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
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleInspirationSubmit = this.handleInspirationSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    this.submitMessage(false);
  }

  handleInspirationSubmit(e) {
    e.preventDefault();
    this.submitMessage(true);
  }

  submitMessage(isInspiration) {
    if (this.state.body === '') return;

    const {activeImpulseId, activeSparkId, activeThreadId,
      impulses, sparks, threads} = this.props;
    const { createMessage } = this.props;

    const activeImpulse = impulses[activeImpulseId];
    const activeSpark = sparks[activeSparkId];
    const activeThread = threads[activeThreadId];

    createMessage(
      activeImpulse.id,
      activeSpark.id,
      activeThread.id,
      this.state.body,
      isInspiration
    );

    this.setState({ body: '' });
  }

  render() {
    // only allow inspirations to be posted in an impulse thread
    // inspirations cannot be nested within other inspirations
    const activeThread = this.props.threads[this.props.activeThreadId];
    const showInspirationSubmit = activeThread.parent_type === "Impulse";

    return (
      <div className="create-message">
        <form>
          <input className="message-text"
            type="text"
            value={this.state.body}
            onChange={this.handleChange} />
          <input className="message-submit" type="submit" value="Message"
            onClick={this.handleMessageSubmit} />
            {showInspirationSubmit &&
              <input className="message-submit" type="submit"
              value="Inspiration" onClick={this.handleInspirationSubmit} />
            }
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
