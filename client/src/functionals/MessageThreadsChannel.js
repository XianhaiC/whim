import React from 'react';
import { connect } from 'react-redux';
import ActionCable from 'actioncable';

import { API_WS_ROOT } from '../constants';
import { exists } from '../helpers';
import { receiveUpdate } from '../actions/index';

class MessageThreadsChannel extends React.Component {
  constructor() {
    super();
    this.state = { subscriptions: {} }
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
  }

    /*
  createSubscriptions() {
    Object.values(this.props.threads).forEach(thread => {
      console.log("LINK")
      console.log(thread);
      console.log(this.state.subscriptions);
      if (!exists(this.state.subscriptions[thread.id])) {
        this.state.subscriptions[thread.id] = this.cable.subscriptions.create(
          {channel: 'MessageThreadsChannel', thread: thread.id},
          {received: (response) => {this.props.receiveUpdate(response)}}
        )
      }
    });
  }
  */

  createSubscriptions() {
    const { subscriptions } = this.state;
    let newState = null;

    Object.values(this.props.threads).forEach(thread => {
      console.log("LINK")
      console.log(thread);
      console.log(subscriptions);
      if (!exists(this.state.subscriptions[thread.id])) {
        if (!exists(newState)) newState = {subscriptions: {...subscriptions}};
        console.log("CREATING")
        newState.subscriptions[thread.id] = this.cable.subscriptions.create(
          {channel: 'MessageThreadsChannel', thread: thread.id},
          {received: (response) => {this.props.receiveUpdate(response)}}
        )
      }
    });

    if (exists(newState)) this.setState(newState);
  }
  componentDidMount() {
    this.createSubscriptions();
  }

  componentDidUpdate() {
    // should only create subscriptions for new threads
    this.createSubscriptions();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps, {
  receiveUpdate
})(MessageThreadsChannel);
