import React from 'react';
import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';

import Message from './Message';

// is in charge of loading messages given an impulse id
class MessageFeed extends React.Component {
  constructor(props) {
    super(props);
    console.log('message feed is rendering');
    this.state = {
      offset: null,
      messages: []
    }

    let date = new Date();
    this.state.offset = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    fetch(`${API_ROOT}${PATH_QUERY_MESSAGES}/${this.props.impulse.id}?offset=${this.state.offset}`, {
      method: 'GET',
      headers: HEADERS
    }
    ).then(res => res.json()
    ).then(messagesNew => {
      this.setState({ messages: [...this.state.messages, ...messagesNew] });
    });
  }

  render() {
    return (
      /*<div className="MessageFeed">
        {this.state.messages.reverse().map(message => <Message message={message}/>)}
      </div>
      */
      <p>Fuck You</p>
    );
  };
}

export default MessageFeed;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages
};
