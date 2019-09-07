import React from 'react';
import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';

import Message from './Message';

// is in charge of loading messages given an impulse id
class MessageFeed extends React.Component {
  render() {
    return (
      <div className="MessageFeed">
        {this.props.messages.map(message => <Message message={message}/>)}
      </div>
    );
  };
}

export default MessageFeed;
