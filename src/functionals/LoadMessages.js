import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import { getThreadMessages, setFetchMessages, 
        setMessageReceived, setFirstLoad } from '../actions/index';

class LoadMessages extends React.Component {
  componentDidUpdate() {
    console.log('LoadMessages component rendering');
    const { activeThreadId, fetchMessages, threads, threadOffsets } = this.props;
    const { setFetchMessages, setMessageReceived } = this.props;
    if (fetchMessages && exists(activeThreadId)) {
      this.props.setFirstLoad(false);
      this.loadThreadMessages();
      setFetchMessages(false);
    }
    else if (exists(activeThreadId) && !exists(threadOffsets[activeThreadId])) {
      this.loadThreadMessages();
      this.props.setFirstLoad(true);
    }

  }

  loadThreadMessages() {
    console.log('LoadThreadMessages is being called');
    this.props.getThreadMessages(this.props.activeThreadId);
    this.props.setMessageReceived(true);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    fetchMessages: state.control.fetchMessages,
    threads: state.threads.threads,
    threadOffsets: state.threads.threadOffsets,
    firstLoad: state.control.firstLoad,
  }
};

export default connect(mapStateToProps, {
  getThreadMessages,
  setFetchMessages,
  setFirstLoad,
  setMessageReceived,
})(LoadMessages);
