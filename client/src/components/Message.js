import React from 'react';

class Message extends React.Component {
  render() {
    let createDate = new Date(this.props.message.created_at);
    return (
      <div className="Message">
        <hr/>
        <div className="message-spark-pic">Profile Pic</div>
        <h3 className="message-spark-name">{this.props.message.spark.name}</h3>
        <p className="message-created-at">{getTimeAMPM(createDate)}</p>
        <p className="message-body">{this.props.message.body}</p>
      </div>
    );
  };
}

export default Message;

// helpers

function getTimeAMPM(time) {
  let isPM = time.getHours() / 12 === 1;
  return `${time.getHours() % 12}:${time.getMinutes()} ${isPM ? "PM" : "AM"}`;
}
