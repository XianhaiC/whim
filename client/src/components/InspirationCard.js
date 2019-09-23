import React from 'react';
import { connect } from 'react-redux';

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
    const { message, sparks } = this.props;
    let createDate = new Date(message.created_at);
    const spark = sparks[message.spark_id];

    return (
      <div className="inspiration-card" onClick={this.handleClick}>
        <hr/>
        <div className="inspiration-card-spark-pic">Profile Pic</div>
        <h3 className="inspiration-card-spark-name">{spark.name}</h3>
        <p className="inspiration-card-created-at">Last updated at {getTimeAMPM(createDate)}</p>
        <p className="inspiration-card-body">{message.body}</p>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    sparks: state.data.sparks,
  };
};

export default connect(mapStateToProps, {
  setActiveThreadId
})(InspirationCard);

// helpers

function getTimeAMPM(time) {
  let isPM = time.getHours() / 12 === 1;
  return `${time.getHours() % 12}:${time.getMinutes()} ${isPM ? "PM" : "AM"}`;
}
