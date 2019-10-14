import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import { getThreadMessages, setFetchMessages,
         setFirstLoad, setScrollDown } from '../actions/index';

class LoadMessages extends React.Component {
  componentDidUpdate() {
    console.log('LoadMessages component rendering');
    const { activeThreadId, fetchMessages, threads, threadOffsets } = this.props;
    const { setFetchMessages } = this.props;
    console.log(fetchMessages);
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
    console.log('LoadThreadMessages is being called');
    this.props.setScrollDown(true);
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
  setScrollDown,
  setFirstLoad
})(LoadMessages);
