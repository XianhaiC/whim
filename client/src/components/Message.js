import React from 'react';

class Message extends React.Component {
  render = () => {
    return (
      <div className="Message">
        <h3>{this.props.spark_name}</h3>
        <p>{this.props.body}</p>
      </div>
    );
  };
}

export default Message;
