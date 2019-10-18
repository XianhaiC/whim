import React from 'react';
import { connect } from 'react-redux';

import { setActiveThreadId, setRightbarComponent } from '../actions/index';
import { exists, RightbarComponent, getTimeAMPM, clipMessage } from '../helpers';

class InspirationCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setActiveThreadId(this.props.threadId);
    this.props.setRightbarComponent(RightbarComponent.DETAILS);
  }

  render() {
    const { messageId, sparks, threads, parentThreadId } = this.props;
    if (!exists(threads[parentThreadId].messages)) return null;
    const message = threads[parentThreadId].messages.find(message =>
      message.id === messageId
    );
    const spark = sparks[message.spark_id];
    const updateDate = new Date(message.updated_at);

    return (
      <div className="inspiration-card inspiration-card-highlight" onClick={this.handleClick}>
        <p className="inspiration-card-text">{clipMessage(message.body)}</p>
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
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps, {
  setActiveThreadId,
  setRightbarComponent
})(InspirationCard);
