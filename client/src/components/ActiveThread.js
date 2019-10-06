import React from 'react';
import  * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';
import EmptyThread from './EmptyThread';
import { setFetchMessages } from  '../actions/index';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  onScroll = () => {
    const { refs } = this;
    const { setFetchMessages, fetchMessages } = this.props;
    const scrollTop = refs.scrollbar.scrollTop;
    if ( scrollTop === 0 ) {
      // Load next 30 messages
      setFetchMessages(true);
    }
  }

  scrollToBottom = () => {
    const { scrollbar } = this.refs;
    const scrollHeight = scrollbar.scrollHeight;
    const height = scrollbar.clientHeight;
    const maxScrollTop = scrollHeight - height;
    console.log('scrollHeight: ' + scrollHeight);
    console.log('clientHeight: ' + height);
    console.log('maxScrollTop: ' + maxScrollTop);
    ReactDOM.findDOMNode(scrollbar).scrollTop = maxScrollTop > 0 ? maxScrollTop: 0;
  }

  render() {
    const { threads, activeThreadId, threadOffsets } = this.props;
    const activeThread = threads[activeThreadId];
    const threadOffset = new Date(threadOffsets[activeThreadId]);
    console.log("DATE");
    console.log(threadOffset);

    let messagesList = null;
    if (exists(activeThread.messages)) {
      /*
      messagesList = activeThread.messages.map(message =>
        <li key={message.id}><Message message={message} /></li>
      );
      */
      messagesList = activeThread.messages.reduce((filtered, message) => {
        const ts = new Date(dateToString(new Date(message.created_at)));
        if (ts >= threadOffset) {
          filtered.push(
            <li key={message.id}><Message message={message} /></li>
          );
        }
        return filtered;
      }, []);
    }
    else return <EmptyThread />

    return (
      <div className="active-thread">
        <div className="active-thread-wrapper" ref='scrollbar'
          onScroll={this.onScroll}>
          <ul>{messagesList}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    threadOffsets: state.threads.threadOffsets,
    threads: state.threads.threads,
    fetchMessages: state.control.fetchMessages
  };
};

export default connect(mapStateToProps, {setFetchMessages})(ActiveThread);

const dateToString = (date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`
}
