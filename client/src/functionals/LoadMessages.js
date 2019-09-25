import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import { getThreadMessages, setFetchMessages } from '../actions/index';

class LoadMessages extends React.Component {
  componentDidUpdate() {
    console.log('LoadMessages component rendering');
    const { activeThreadId, fetchMessages, threads } = this.props;
    const { setFetchMessages } = this.props;
    console.log(fetchMessages);
    if (fetchMessages && exists(activeThreadId)) {
      this.loadThreadMessages();
      setFetchMessages(false);
    }
    else if (exists(activeThreadId)) {
      const activeThread = threads[activeThreadId];
      if (!exists(activeThread.messages))
        this.loadThreadMessages();
    }

  }

  loadThreadMessages() {
    console.log('LoadThreadMessages is being called');
    this.props.getThreadMessages(this.props.activeThreadId);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    fetchMessages: state.control.fetchMessages,
    threads: state.threads.threads
  }
};

export default connect(mapStateToProps, {
  getThreadMessages,
  setFetchMessages
})(LoadMessages);
