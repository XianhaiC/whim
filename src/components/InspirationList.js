import React from 'react';
import { connect } from 'react-redux';

import { switchThread } from '../actions/index';
import InspirationCard from './InspirationCard';

class InspirationList extends React.Component {
  render() {
    const { activeImpulseId, activeThreadId, threads } = this.props;
    const activeThread = threads[activeThreadId];

    // find the impulses' inspiration threads and sort them by most recently
    // updated
    const inspirationThreads = sortedThreads(
      Object.values(threads).filter(thread =>
        thread.impulse_id === activeImpulseId
        && thread.parent_type === "Message"
    ));
    const activeImpulse = this.props.impulses[activeImpulseId];

    console.log("IN LIST");
    console.log(inspirationThreads);
    // map threads to card components
    const cardsList = inspirationThreads.map(thread => {
      return (
      <li key={thread.parent.id}>
        <InspirationCard messageId={thread.parent_id} threadId={thread.id} parentThreadId={thread.parent.parent_thread_id} />
      </li>
    )});

    return (
      <div className="inspiration-list">
        <div className="inspiration-list-header">
          <div className="inspiration-list-info top-info">
            <h3 className="inspiration-list-title">Inspirations</h3>
            <div className="inspiration-list-sub top-info-sub">
              <p>{activeImpulse.inspirations_created} Idea{activeImpulse.inspirations_created != 1 ? "s" : ""} brewing...</p>
            </div>
          </div>
        </div>
        <div className="inspiration-list-wrapper">
          <ul className="inspiration-list-container">
            {cardsList}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeImpulseId: state.control.activeImpulseId,
    activeThreadId: state.control.activeThreadId,
    impulses: state.data.impulses,
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps)(InspirationList);

// helpers

// sorts in descending order
const sortedThreads = threads => {
  return threads.sort(
    (a, b) => new Date(b.parent.updated_at) - new Date(a.parent.updated_at)
  );
};
