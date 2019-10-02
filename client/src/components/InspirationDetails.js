import React from 'react';
import { connect } from 'react-redux';

import { getTimeAMPM, clipMessage } from '../helpers';

class InspirationDetails extends React.Component {
  render() {
    const {activeThreadId,
      impulses, sparks, threads } = this.props;
    const activeThread = threads[activeThreadId];
    const impulseThread =
      threads[impulses[activeThread.impulse_id].message_thread.id];;
    const message = impulseThread.messages.find(message =>
      message.id == activeThread.parent_id);

    const updateDate = new Date(message.updated_at);
    console.log("DATE");
    console.log(updateDate);
    const spark = sparks[message.spark_id];

    return (
      <div className="inspiration-details">
        <div className="inspiration-list-header">
          <div className="inspiration-list-info top-info">
            <h3 className="inspiration-list-title">{spark.name}'s inspiration</h3>
            <div className="inspiration-list-sub top-info-sub">
              <p>Last updated at {getTimeAMPM(updateDate)}</p>
            </div>
          </div>
        </div>
        <div className="inspiration-card inspiration-card-details">
          <p className="inspiration-card-text">{message.body}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    threads: state.threads.threads,
    impulses: state.data.impulses,
    sparks: state.data.sparks
  };
};

export default connect(mapStateToProps)(InspirationDetails);
