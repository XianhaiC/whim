import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import { getThreadMessages, setFetchMessages,
         setFirstLoad, setScrollUp } from '../actions/index';

class LoadMessages extends React.Component {
  componentDidUpdate() {
    const { activeThreadId, fetchMessages, threads, threadOffsets } = this.props;
    const { setFetchMessages } = this.props;
    if (fetchMessages && exists(activeThreadId)) {
      this.loadThreadMessages();
      setFetchMessages(false);
      this.props.setFirstLoad(false);
    }
    else if (exists(activeThreadId) && !exists(threadOffsets[activeThreadId])) {
      this.props.setFirstLoad(true);
      this.loadThreadMessages();
    }

  }

  loadThreadMessages() {
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
    threads: state.threads.threads,
    threadOffsets: state.threads.threadOffsets
  }
};

export default connect(mapStateToProps, {
  getThreadMessages,
  setFetchMessages,
  setScrollUp,
  setFirstLoad
})(LoadMessages);
