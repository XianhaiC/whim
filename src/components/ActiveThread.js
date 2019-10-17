import React from 'react';
import  * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { exists } from '../helpers';
import Message from './Message';
import EmptyThread from './EmptyThread';
import { setFetchMessages, setFirstLoad, setScrollUp } from  '../actions/index';

// is in charge of loading messages given an impulse id
class ActiveThread extends React.Component {
  

  constructor(props) {
    super(props);
    this.messagesList = null;
    this.historyChanged = false;
    this.scrollAtBottom = true;
    this.scrollAtTop = false; 
    this.onScroll = this.onScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }


  UNSAFE_componentWillUpdate (nextProps) {
    const { threads, activeThreadId } = this.props; 
    const nextActiveThread = nextProps.threads[nextProps.activeThreadId];
    const activeThread = threads[activeThreadId];
    if (nextActiveThread.messages !== undefined && activeThread.messages !== undefined) {
      this.historyChanged = nextActiveThread.messages.length !== activeThread.messages.length; 
    }
    const { scrollbar } = this.refs;
    if (!exists(scrollbar)) {

      if (this.historyChanged) {

        const scrollPos = scrollbar.scrollTop;
        const scrollBottom = (scrollbar.scrollHeight - scrollbar.clientHeight);
        this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
      }
      if (!this.scrollAtBottom) {
        const numMessages = scrollbar.childNodes.length;
        this.topMessage = numMessages === 0 ? null : scrollbar.childNodes[0];
        console.log(ReactDOM.findDOMNode(this.topMessage));
      }
    }
  }
  
  componentDidUpdate(prevProps) {
    const {threads, activeThreadId} = this.props;
    const activeThread = threads[activeThreadId];
    const {scrollbar} = this.refs;
    
    if (exists(scrollbar)) {
      if(this.messagesList.length > 0) {
        if (this.props.firstLoad) {
          this.scrollToBottom();
          this.props.setFirstLoad(false);
        }
        else {
          if(this.historyChanged) {
            if(this.scrollAtBottom && !this.props.fetchMessages) this.scrollToBottom();
	    
	  }
          if (this.topMessage && this.messagesList.length === activeThread.messages.length && 
	      activeThread.messages.length === prevProps.threads[prevProps.activeThreadId].messages.length) {
            ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
          }
        }
      }
    }
  }

  onScroll = () => {
    const { scrollbar } = this.refs;
    const { setFetchMessages, fetchMessages } = this.props;
    const scrollTop = scrollbar.scrollTop;
    if ( scrollTop === 0 ) {
      // Load next 30 messages
      setFetchMessages(true); 
    }
  }

  scrollToBottom = () => {
    const { scrollbar } = this.refs;
    
    if (exists(scrollbar)) {
      const scrollHeight = scrollbar.scrollHeight;
      const height = scrollbar.clientHeight;
      const maxScrollTop = scrollHeight - height;
      ReactDOM.findDOMNode(scrollbar).scrollTop = maxScrollTop > 0 ? maxScrollTop: 0;
    }
  }

  render() {
    const { threads, activeThreadId, threadOffsets } = this.props;
    const activeThread = threads[activeThreadId];
    const threadOffset = new Date(threadOffsets[activeThreadId]);
    
    if (exists(activeThread.messages)) {
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
    scrollUp: state.control.scrollUp,
  };
};

export default connect(mapStateToProps, {
  setFetchMessages,
  setFirstLoad,
  setScrollUp,
})(ActiveThread);

const dateToString = (date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`
}
