import React from 'react';
import { connect } from 'react-redux';

import { setActiveThreadId } from '../actions/index';

class Message extends React.Component {
  constructor() {
    super();
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  handleMoreClick() {
    const { message, threads } = this.props;
    const messageThread = Object.values(threads).find(thread => 
      thread.parent_type === "Message" && thread.parent_id == message.id
    );

    this.props.setActiveThreadId(messageThread.id);
  }

  render() {
    const { message, sparks } = this.props;
    let createDate = new Date(message.created_at);
    console.log("ALL S");
    console.log(sparks);
    console.log(message);
    const spark = sparks[message.spark_id];

    const messageBody = message.is_inspiration ?
      <p className="message-inspiration">{message.body}</p> :
      <p className="message-text">{message.body}</p>;
    const messageMore = message.is_inspiration ? (
      <div className="message-more" onClick={this.handleMoreClick}>
        <i className="fas fa-chevron-down"></i>  Expand thread
      </div>
      ) : null;

    return (
      <div className="message">
        <div className="message-container">
          <div className="message-spark-pic"></div>
          <div className="message-body">
            <div className="message-header">
              <h4 className="message-spark-name">{spark.name}</h4>
              <p className="message-created-at">{getTimeAMPM(createDate)}</p>
            </div>
            {messageBody}
          </div>
        </div>
        {messageMore} 
        <hr/>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    sparks: state.data.sparks,
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps, {
  setActiveThreadId
})(Message);

// helpers

function getTimeAMPM(time) {
  let isPM = time.getHours() / 12 === 1;
  return `${time.getHours() % 12}:${time.getMinutes()} ${isPM ? "PM" : "AM"}`;
}
