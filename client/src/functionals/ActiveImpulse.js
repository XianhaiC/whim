import React from 'react';
import { connect } from 'react-redux';

import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';

class ActiveImpulse extends React.Component {
  componentDidUpdate() {
    this.updateActiveThread();
  }

  updateActiveThread() {
    const { activeImpulse, threads, cachedThreads } = this.props;

    let cachedThread = cachedThreads[activeImpulse.id];
    if (exists(cachedThread)) this.props.setActiveThread(cachedThread);
    else {
      let activeThread = threads[activeImpulse.thread_id];
      this.props.setActiveThread(activeThread);
      this.props.updateCachedThread(activeImpulse.id, activeThread);
    }
  }

  render() {
    return null;
  }
}

export mapStateToProps = state => {
  return {
    threads: state.threads,
    cachedThreads: state.cachedThreads,
    activeImpulse: state.activeImpulse
  }
};

export default connect(mapStateToProps, {
  setActiveThread
})(ActiveImpulse);
