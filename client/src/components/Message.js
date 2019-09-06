import React from 'react';

class Message extends React.Component {
  render = () => {
    return (
      <div className="Message">
        <hr/>
        <div className="message-spark-pic">Profile Pic</div>
        <h3 className="message-spark-name">{this.props.message.spark.name}</h3>
        <p className="message-created-at">{this.props.message.created_at}</p>
        <p className="message-body">{this.props.message.body}</p>
      </div>
    );
  };
}

export default Message;
