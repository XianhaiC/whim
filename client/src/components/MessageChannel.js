import React from 'react';
import { API_WS_ROOT } from '../constants';
import ActionCable from 'actioncable';

class MessageChannel extends React.Component {
  constructor(props) {
    super(props);
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
  }

  createSubscription(impulse_id) {
    this.subscription = this.cable.subscriptions.create(
      { channel: 'ActiveMessagesChannel', impulse: impulse_id },
      { received: (response) => { this.props.onResponse(response) }}
    )
  }

  componentDidMount(){
    this.createSubscription(this.props.impulse_id);
  }

  render = () => {
    return null;
  }
}
export default MessageChannel;
