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

    // map threads to card components
    const cardsList = inspirationThreads.map(thread => {
      console.log("INSPO");
      console.log(thread.parent.spark);
      return (
      <li key={thread.parent.id}>
        <InspirationCard message={thread.parent} threadId={thread.id} />
      </li>
    )});

    return (
      <div className="inspiration-list">
        <p>Inspirations</p>
        <hr />
        <ul className="inspiration-list-flex">
          {cardsList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeImpulseId: state.control.activeImpulseId,
    activeThreadId: state.control.activeThreadId,
    threads: state.threads.threads
  };
};

export default connect(mapStateToProps)(InspirationList);

// helpers

const sortedThreads = threads => {
  return threads.sort(
    (a, b) => new Date(a.parent.updated_at) - new Date(b.parent.updated_at)
  );
};
