import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewImpulseForm from './NewImpulseForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ImpulseList extends React.component { 
  
  state = { 
    impulses : [],
    activeImpulse: null
  };

  componentDidMount = () => {
    fetch('${API_ROOT}/impulses')
      .then(res => res.json())
      .then(conversations => this.setState({ impulses }));
  };
  
  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedImpulse = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  }

  render = () => {
    const { impulses, activeImpulse } = this.state;
    return (
	  <div className="impulsesList">
        <ActionCable channel={{ channel: '' }}
                     onReceived={this.handleReceivedImpulse}
        />
       
        {this.state.conversations.lenght ? (
          <Cable impulses={impulses}
                 handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
       <h2>Impulses</h2>
       <ul>{mapImpulses(impulses, this.handleClick)}</ul> 
       <NewImpulseForm/> 
       {activeImpulse ? (   
         <MessagesArea
           impulse={findActiveImpulse(
             impulses,
             activeImpulse
           )}
         />  
       ) :null}
    </div>
    );
  };
}
export default ImpulseList

// Helper Functions

const findActiveImpulse = (impulses, activeImpulse) => {
  return impulses.find(
    impulse => impulse.id === activeImpulse
  );
};

const mapImpulses = (impulses, handleClick) => {
  return impulses.map(impulse => {
    return (
      <li key={impulse.id} onClick={() => handleClick (impulse.id)}>
        {impulse.title}
      </li>
    );
  });
};