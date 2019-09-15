import React from 'react';
import { API_WS_ROOT } from '../constants';
import ActionCable from 'actioncable';

class ThreadMessagesChannel extends React.Component {
  constructor(props) {
    super(props);
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
  }

  createSubscription(threadId) {
    this.subscription = this.cable.subscriptions.create(
      {channel: 'ThreadMessagesChannel', thread: threadId},
      {received: (response) => {this.props.receiveMessage(response.message)}}
    )
  }

  componentDidMount(){
    this.createSubscription(this.props.threadId);
  }

  render = () => {
    return null;
  }
}

export default connect(null, {
  receiveMessage
})(ThreadMessagesChannel);
