import React from 'react';
import NewMessageForm from './NewMessageForm';
import Message from './Message';

class MessageFeed extends React.Component {

  render = () => {
    return (
      <div className="MessageFeed">
        {
          orderedMessages(this.props.impulse.messages).map(message => {
            const spark_poster = this.props.sparks.find(
              spark => spark.id == message.spark_id
            );
            return (
              <Message spark_name={spark_poster.name} body={message.body} />
            );
          })
        }
      </div>
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
