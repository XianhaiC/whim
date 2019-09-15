import React from 'react';
import { connect } from 'react-redux';

import Message from './Message';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  render() {
    const { activeThread } = this.props

    return (
      <div className="active-thread">
        {activeThread.messages.map(message => <Message message={message} />)}
      </div>
    );
  };
}

export matStateToProps = state => {
  return {
    activeThread: state.activeThread
  }
};

export default connect(mapStateToProps)(ActiveThread);
