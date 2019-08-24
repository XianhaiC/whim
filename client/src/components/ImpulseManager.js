import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';
import NewImpulseForm from './NewImpulseForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ImpulseManager extends React.Component { 

  state = { 
    impulses: [],
    active_impulse_id: null
  };


  componentDidMount = () => {
    fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        email: 'jonny@gmail.com',
        password: 'helloworld'
      })
    })
      .then(res => res.json())
      .then(auth_payload => {
        console.log(auth_payload);
        fetch(`${API_ROOT}/accounts/${auth_payload['account']['id']}/impulses`, {
          headers: {
            ...HEADERS,
            AuthorizationLogin: `Bearer ${auth_payload['auth_token']}`
          }
        })
        .then(res => res.json())
        .then(impulses => {
          console.log(impulses);
          this.setState({ impulses })})}
      );
  };

  handleClick = id => {
    this.setState({ active_impulse_id: id });
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
  };

  render = () => {
    const { impulses, active_impulse_id } = this.state;
    return (
      <div className="ImpulseManager">
        {this.state.impulses.length && (
          <ActiveMessagesChannels
            impulses={impulses}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        )}
        <ImpulsesList impulses={impulses} onClick={this.handleClick}/>
        <ActiveImpulse active_impulse_id={active_impulse_id}/>

        <h2>Impulses</h2>
        <NewImpulseForm/> 
        {active_impulse_id ? (   
          <MessagesArea
          impulse={findActiveImpulse(
            impulses,
            active_impulse_id
          )}
          />  
        ) :null}
      </div>
    );
  };
}

export default ImpulseManager;

// Helper Functions

const findActiveImpulse = (impulses, active_impulse_id) => {
  return impulses.find(
    impulse => impulse.id === active_impulse_id
  );
};

