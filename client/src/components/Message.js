import React from 'react';
import { connect } from 'react-redux';

class Message extends React.Component {
  render() {
    const { message, sparks } = this.props;
    let createDate = new Date(message.created_at);
    console.log("ALL S");
    console.log(sparks);
    console.log(message);
    const spark = sparks[message.spark_id];

    return (
      <div className="message">
        <hr/>
        <div className="message-header">
          <div className="message-spark-pic spark-pic"></div>
          <h4 className="message-spark-name">{spark.name}</h4>
          <p className="message-created-at">{getTimeAMPM(createDate)}</p>
        </div>
        <p className="message-body">{message.body}</p>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    sparks: state.data.sparks,
  };
};

export default connect(mapStateToProps)(Message);

// helpers

function getTimeAMPM(time) {
  let isPM = time.getHours() / 12 === 1;
  return `${time.getHours() % 12}:${time.getMinutes()} ${isPM ? "PM" : "AM"}`;
}
