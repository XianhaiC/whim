import React from 'react';
import { connect } from 'react-redux';

import Message from './Message';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  render() {
    return (
      <div className="active-thread">
          {this.props.activeThread.messages.map(message => {
            return <Message message={message} />})}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeThread: state.threads.activeThread
  };
};

export default connect(mapStateToProps)(ActiveThread);
