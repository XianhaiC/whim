import React from 'react';
import md5 from 'md5';
import { connect } from 'react-redux';

import { setActiveThreadId } from '../actions/index';
import { PATH_GRAVATAR } from '../constants';
import { exists, getTimeAMPM } from '../helpers';

class Message extends React.Component {
  constructor() {
    super();
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  handleMoreClick() {
    const { message, threads } = this.props;
    const messageThread = Object.values(threads).find(thread =>{
      return thread.parent_type === "Message" && thread.parent_id === message.id;
    });

    this.props.setActiveThreadId(messageThread.id);
  }

  render() {
    const { message, sparks } = this.props;
    let createDate = new Date(message.created_at);
    const spark = sparks[message.spark_id];

    const messageBody = message.is_inspiration ?
      <p className="message-inspiration">{message.body}</p> :
      <p className="message-text">{message.body}</p>;
    const messageMore = message.is_inspiration ? (
      <div className="message-more" onClick={this.handleMoreClick}>
        <i className="fas fa-chevron-down"></i>  Expand thread
      </div>
      ) : null;
    const hash = exists(spark.email) ? md5(spark.email) :
      md5(spark.name + spark.id);

    return (
      <div className="message">
        <div className="message-container">
          <img className="message-spark-pic" alt=""
            src={`${PATH_GRAVATAR}/${hash}?s=40&d=retro&r=pg`} />
          <div className="message-body">
            <div className="message-header">
              <h4 className="message-spark-name">{spark.name}</h4>
              {exists(spark.handle) && <p>@{spark.handle}</p>}
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
