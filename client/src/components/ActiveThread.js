import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  render() {
    const activeThread = this.props.threads[this.props.activeThreadId];
    let messagesList = null;
    if (exists(activeThread.messages)) {
      messagesList = activeThread.messages.map(message =>
        <li key={message.id}><Message message={message} /></li>
      );
    }

    return (
      <div className="active-thread">
        <ul>{messagesList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps)(ActiveThread);
