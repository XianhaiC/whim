import React from 'react';
import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';

import MessageFeed from './MessageFeed';
import CreateMessage from './CreateMessage';
import ImpulseHeader from './ImpulseHeader';
import MessageChannel from './MessageChannel';

class CenterActiveImpulse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: null,
      messages: []
    }

    this.handleMessageReceived = this.handleMessageReceived.bind(this);

    //TODO: create cachedThreadOffsets that store the load offset for each thread (keyed by thread id)
    let cachedThreadId = this.props.cachedThreadIds[this.props.activeImpulseId];
    if (exists(cachedThreadId)) this.props.setActiveThreadId(cachedThreadIds);
    else {
      let activeImpulse = this.props.impulses.find(
        impulse => impulse.id == this.props.activeImpulseId);
      this.props.setActiveThreadId(activeImpulse.thread_id);
    }

    let date = new Date();
    this.state.offset = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    fetch(`${API_ROOT}${PATH_QUERY_MESSAGES}/${this.props.active_impulse.id}?offset=${this.state.offset}`, {
      method: 'GET',
      headers: HEADERS
    }
    ).then(res => res.json()
    ).then(messagesNew => {
      this.setState({ offset: new Date(messagesNew[messagesNew.length - 1].created_at), messages: [...messagesNew.reverse(), ...this.state.messages] });
    });
  }

  handleMessageReceived(response) {
    const { message } = response;
    this.setState({ messages: [...this.state.messages, message] });
  }

  render() {
    return (
      <div className="CenterActiveImpulse">
        <MessageChannel impulse_id={this.props.active_impulse.id} onResponse={this.handleMessageReceived} />
        <p>Invite hash: {this.props.active_impulse.invite_hash}</p>
        <ImpulseHeader impulse={this.props.active_impulse}/>
        <MessageFeed />
        <CreateMessage impulse_id={this.props.active_impulse.id} spark_id={this.props.active_spark.id}/>
      </div>
    );
  };
}

export default CenterActiveImpulse;
