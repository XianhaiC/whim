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
    const updateDate = new Date(message.updated_at);
    const spark = sparks[message.spark_id];

    return (
      <div className="inspiration-card" onClick={this.handleClick}>
        <p className="inspiration-card-text">{message.body}</p>
        <div className="inspiration-card-footer">
          <p className="inspiration-card-spark-name">{spark.name}</p>
          <p className="inspiration-card-created-at">Last updated at {getTimeAMPM(updateDate)}</p>
        </div>
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
