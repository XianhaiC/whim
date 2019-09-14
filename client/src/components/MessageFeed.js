import React from 'react';
import { connect } from 'react-redux';

import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';
import Message from './Message';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  constructor() {
    super();

    //TODO: move to proper function that executes before render
    const activeThread = this.props.threads.find(
      thread => thread.id == this.props.activeThreadId);

    if (!exists(activeThread.messages)) 
      this.props.getThreadMessages(this.props.activeThreadId);
  }
  render() {
    const activeThread = this.props.threads.find(
      thread => thread.id == this.props.activeThreadId);

    return (
      <div className="active-thread">
        {activeThread.messages.map(message => <Message message={message} />)}
      </div>
    );
  };
}

export matStateToProps = state => {
  return {
    threads: state.threads,
    activeThreadId: state.activeThreadId
  }
}

export default connect(mapStateToProps, {
  getThreadMessages
})(ActiveThread);
