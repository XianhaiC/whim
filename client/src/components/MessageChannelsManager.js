// TODO: delete if obsolete
import React, { Fragment } from 'react';
import ActionCable from 'actioncable';

import MessageChannel from './MessageChannel';

class MessageChannelsManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>{
        this.props.impulses.map(impulse => {
          return <MessageChannel impulse_id={impulse.id} onResponse={this.props.handleReceivedMessage} />
        })
      }</>
    );
  };
};

export default MessageChannelsManager; 
