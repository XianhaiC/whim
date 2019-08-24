import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewImpulseForm from './NewImpulseForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ImpulseList extends React.Component { 
  
  state = { 
    impulses : [],
    activeImpulse: null
  };

  /*
  componentDidMount = () => {
    fetch('${API_ROOT}/impulses')
      .then(res => res.json())
      .then(impulses => this.setState({ impulses }));
  };*/
  
  handleClick = id => {
    this.setState({ activeImpulse: id });
  };

  handleReceivedImpulse = response => {
    const { impulse } = response;
    this.setState({
      impulses: [...this.state.impulses, impulse]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const impulses = [...this.state.impulses];
    const impulse = impulses.find(
      impulse => impulse.id === message.impulse_id
    );
    impulse.messages = [...impulse.messages, message];
    this.setState({ impulses });
  }

  render = () => {
    const { impulses, activeImpulse } = this.state;
    return (
	  <div className="impulsesList">
        <ActionCable channel={{ channel: '' }}
                     onReceived={this.handleReceivedImpulse}
        />
       
        {this.state.impulses.length ? (
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
