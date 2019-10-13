import React from 'react';
import { connect } from 'react-redux';
import ActionCable from 'actioncable';

import { API_WS_ROOT } from '../constants';
import { exists } from '../helpers';
import { receiveImpulse } from '../actions/index';

class ImpulsesChannel extends React.Component {
  constructor() {
    super();
    this.state = { subscriptions: {} }
    this.cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
  }

  createSubscriptions() {
    const { subscriptions } = this.state;
    let newState = null;

    Object.values(this.props.impulses).forEach(impulse => {
      if (!exists(this.state.subscriptions[impulse.id])) {
        if (!exists(newState)) newState = {subscriptions: {...subscriptions}};
        newState.subscriptions[impulse.id] = this.cable.subscriptions.create(
          {channel: 'ImpulsesChannel', impulse: impulse.id},
          {received: (response) => {this.props.receiveImpulse(response)}}
        )
      }
    });

    if (exists(newState)) this.setState(newState);
  }
  componentDidMount() {
    this.createSubscriptions();
  }

  componentDidUpdate() {
    this.createSubscriptions();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    impulses: state.data.impulses
  };
};

export default connect(mapStateToProps, {
  receiveImpulse
})(ImpulsesChannel);
