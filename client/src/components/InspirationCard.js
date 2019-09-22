import React from 'react';

import { setActiveThreadId } from '../actions/index';

class InspirationCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setActiveThreadId(this.props.threadId);
  }

  render() {
    let createDate = new Date(this.props.message.created_at);
    return (
      <div className="inspiration-card" onClick={this.handleClick}>
        <hr/>
        <div className="inspiration-card-spark-pic">Profile Pic</div>
        <h3 className="inspiration-card-spark-name">{this.props.message.spark.name}</h3>
        <p className="inspiration-card-created-at">Last updated at {getTimeAMPM(createDate)}</p>
        <p className="inspiration-card-body">{this.props.message.body}</p>
      </div>
    );
  };
}

export default InspirationCard;

// helpers

function getTimeAMPM(time) {
  let isPM = time.getHours() / 12 === 1;
  return `${time.getHours() % 12}:${time.getMinutes()} ${isPM ? "PM" : "AM"}`;
}
