import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  render() {
    const activeThread = this.props.threads[this.props.activeThreadId];

    return (
      <div className="active-thread">
          {exists(activeThread.messages) && activeThread.messages.map(message => {
            return <Message message={message} />})}
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
