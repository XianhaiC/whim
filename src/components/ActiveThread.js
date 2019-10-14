import React from 'react';
import  * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';
import EmptyThread from './EmptyThread';
import { setFetchMessages, setMessageReceived, setFirstLoad } from  '../actions/index';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {

  constructor(props) {
    super(props);

    this.scrollAtBottom = true;
    this.messagesList = null;
    this.onScroll = this.onScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps) {
    console.log("copmonentWillUPdate");
    console.log(this.props.messageReceived);
    const { scrollbar } = this.refs;

    if (scrollbar != null) {
      if (this.props.messageReceived) {
      const scrollPos = scrollbar.scrollTop;
      const scrollBottom = (scrollbar.scrollHeight - scrollbar.clientHeight);
      this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom );

        // if message is not at the bottom save the position of last message
        if (!this.scrollAtBottom) {
          const numMessages = scrollbar.childNodes.length;
          this.topMessage = numMessages === 0 ? null : scrollbar.childNodes[0];
          console.log(ReactDOM.findDOMNode(this.topMessage));
        }
      }
      
      return this.scrollAtBottom;
    }
    
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    const { scrollbar } = this.refs;
    const { messageReceived, firstLoad, setMessageReceived, setFirstLoad } = this.props;
    console.log(snapshot);
    // Check that scrollbar has rendered for inspirations and impulses
    if (scrollbar != null ) {
      // Check that messages have been received by the back end and loaded first messages
      if (messageReceived && this.messagesList.length > 0) {
        if(this.firstLoad) {
          console.log("firstLoad is true block");
          this.scrollToBottom();
          setFirstLoad(false);
        }
        else {
          if (snapshot) {
            console.log("scroll is at the bottom");
            this.scrollToBottom();
          }
          else if (!this.scrollAtBottom && this.topMessage) {
            ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
          }
        }
        //setMessageReceived(false);
      }
    }
  }

  onScroll = () => {
    const { scrollbar } = this.refs;
    const { setFetchMessages, fetchMessages } = this.props;
    const scrollTop = scrollbar.scrollTop;

    // Load next 30 messages if scrollbar reaches the top
    if ( scrollTop === 0 ) {
      setFetchMessages(true);
    }
  }


  // Method that scrolls to the bottom of the page
  scrollToBottom = () => {
    const { scrollbar } = this.refs;
    const scrollHeight = scrollbar.scrollHeight;
    const height = scrollbar.clientHeight;
    const maxScrollTop = scrollHeight - height;
    console.log('scrollHeight: ' + scrollHeight);
    console.log('clientHeight: ' + height);
    console.log('maxScrollTop: ' + maxScrollTop);
    ReactDOM.findDOMNode(scrollbar).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { threads, activeThreadId, threadOffsets } = this.props;
    const activeThread = threads[activeThreadId];
    const threadOffset = new Date(threadOffsets[activeThreadId]);
    console.log("DATE");
    console.log(threadOffset);

    console.log("CHECKING NEW MESSAGES");
    console.log(activeThread.messages);
    if (exists(activeThread.messages)) {
      /*
      messagesList = activeThread.messages.map(message =>
        <li key={message.id}><Message message={message} /></li>
      );
      */
      this.messagesList = activeThread.messages.reduce((filtered, message) => {
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
        <ul className="active-thread-wrapper" ref='scrollbar' 
          onScroll={this.onScroll}>{this.messagesList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    messageReceived: state.control.messageReceived,
    firstLoad: state.control.firstLoad,
    threadOffsets: state.threads.threadOffsets,
    threads: state.threads.threads,
    fetchMessages: state.control.fetchMessages
  };
};

export default connect(mapStateToProps, {
  setFetchMessages,
  setMessageReceived,
  setFirstLoad,
})(ActiveThread);

const dateToString = (date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`
}
