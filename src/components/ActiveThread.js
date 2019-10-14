import React from 'react';
import  * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';
import EmptyThread from './EmptyThread';
import { setFetchMessages, setFirstLoad, setScrollDown } from  '../actions/index';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  

  constructor(props) {
    super(props);
    this.messagesList = null;
    this.scrollAtBottom = false;
    this.onScroll = this.onScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }


  UNSAFE_componentWillUpdate (nextProps) {
    this.historyChanged = nextProps.threads[nextProps.activeThreadId].messages.length
      !== this.props.threads[this.props.activeThreadId].messages.length;
    const { scrollbar } = this.refs;
    if (scrollbar !== null) {

      console.log(this.historyChanged);
      if (this.props.scrollDown && this.historyChanged) {

        const scrollPos = scrollbar.scrollTop;
        const scrollBottom = (scrollbar.scrollHeight - scrollbar.clientHeight);
        this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
      }
      if (!this.scrollAtBottom) {
        const numMessages = scrollbar.childNodes.length;
        this.topMessage = numMessages === 0 ? null : scrollbar.childNodes[0];
        console.log(this.topMessage);
        console.log(ReactDOM.findDOMNode(this.topMessage));
      }
    }
  }
  
  componentDidUpdate(prevProps) {
    const {scrollbar} = this.refs;
    if (scrollbar !== null) {
      console.log("scroll down");
      console.log(this.props.scrollDown);
      console.log('messages list');
      console.log(this.messagesList);
      if(this.props.scrollDown && this.messagesList.length > 0) {
        console.log('first Load');
        console.log(this.props.firstLoad);
        if (this.props.firstLoad) {
          this.scrollToBottom();
          this.props.setFirstLoad(false);
        }
        else {
          if(this.historyChanged) {
            if(this.scrollAtBottom) this.scrollToBottom();
            if(this.topMessage) ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
          }
          else {
            if(this.topMessage) ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
          }
        }
        this.props.setScrollDown(false);
      }
    }
  }

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
          onScroll={this.onScroll}>{this.messagesList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeThreadId: state.control.activeThreadId,
    threadOffsets: state.threads.threadOffsets,
    threads: state.threads.threads,
    fetchMessages: state.control.fetchMessages,
    firstLoad: state.control.firstLoad,
    scrollDown: state.control.scrollDown,
  };
};

export default connect(mapStateToProps, {
  setFetchMessages,
  setFirstLoad,
  setScrollDown,
})(ActiveThread);

const dateToString = (date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`
}
