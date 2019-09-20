import React from 'react';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  render() {
    const { activeThread } = this.props;

    console.log("RENDER ACR");
    console.log(activeThread);
    return (
      <div className="active-thread">
          {exists(activeThread.messages) && activeThread.messages.map(message => {
            return <Message message={message} />})}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("map ACR");
  console.log(state.control.activeThread);
  return {
    activeThread: state.control.activeThread
  };
};

export default connect(mapStateToProps)(ActiveThread);
