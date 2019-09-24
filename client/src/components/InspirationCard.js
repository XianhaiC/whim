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
      <div className="inspiration-card message" onClick={this.handleClick}>
        <div className="inspiration-card-header message-header">
          <div className="inspiration-card-spark-pic spark-pic"></div>
          <h3 className="inspiration-card-spark-name message-spark-name">{spark.name}</h3>
          <p className="inspiration-card-created-at">Last updated at {getTimeAMPM(createDate)}</p>
        </div>
        <div className="inspiration-card-body">
          <p className="inspiration-card-text">{message.body}</p>
        </div>
        <hr/>
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
