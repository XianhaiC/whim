import React from 'react';
import * as ReactDOM from 'react-dom';
import { API_ROOT, HEADERS, PATH_QUERY_MESSAGES } from '../constants';

import Message from './Message';

// is in charge of loading messages given an impulse id
class MessageFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages_query: [],
      message_subset: 5,
      loading: false, 
    }

    this.onScroll = this.onScroll.bind(this);
  }
    
  // Checks whether view is at the bottom to enable autoscroll function
  componentWillUpdate(nextProps) {
    const { scrollbar } = this.refs;
    this.messagesUpdated = nextProps.messages.length !== this.props.messages.length;


    if (this.messagesUpdated) {
      const scrollPos = scrollbar.scrollTop;
      const scrollBottom = ( scrollbar.scrollHeight - scrollbar.clientHeight);
      console.log(scrollBottom);
      this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom ); 
    }
    if (!this.scrollAtBottom) {
      const numMessages = scrollbar.childNodes.length; 
      this.topMessage = numMessages === 0 ? null : scrollbar.childNodes[0];
      this.scrollToBottom();
    }

  }

  // Auto-scroll to bottom of MessageFeed on render or when new messages arrive 
  componentDidUpdate() {
    if (this.messagesUpdated) {
      if (this.scrollAtBottom) {
        this.scrollToBottom(); 
      }
      
      if (this.topMessage) {
        ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
      }
    }
  }
  
  onScroll = () => {
    //console.log(this.refs.scrollbar.scrollTop);
    const { refs, props } = this; 
    const scrollTop = refs.scrollbar.scrollTop;
    if ( scrollTop === 0) {
      this.loadMore(); 
    }
  }

  loadMore() {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({message_subset: this.state.message_subset + 15, loading: false });
    }, 2000);
  }

  getQuery() {
    this.state.messages_query = this.props.messages.slice(this.props.messages.length - this.state.message_subset, 
                                                  this.props.messages.length);
    console.log(this.state.messages_query);
    console.log(this.props.messages);
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
    return (
      <div ref='scrollbar' onScroll={ this.onScroll } className="MessageFeedWrapper" style={{height: 400, overflowY: 'scroll'}}> 
        <div className="MessageFeed"> 
          {this.getQuery()}
          {this.state.loading
            ? <p className="MessageLoading"> Loading Messages... </p>
            : ""}

          {this.state.messages_query.map( message => <Message message={message}/>)}
        </div>
      </div>
    );
  };
}

export default MessageFeed;

