import React from 'react';
import { connect } from 'react-redux';

import InspirationList from './InspirationList';
import InspirationDetails from './InspirationDetails';

class InspirationBar extends React.Component {
  render() {
    const { thread, activeThreadId } = this.props;

    let activeThread = thread[activeThreadId];
    if (activeThread.parent_type === "Impulse")
      return <InspirationList />
    else
      return <InspirationDetails />
  }
}

const mapStateToProps = state => {
  return {
    thread: state.threads.threads,
    activeThreadId: state.control.activeThreadId
  };
};

export default connect(mapStateToProps)(InspirationBar);
