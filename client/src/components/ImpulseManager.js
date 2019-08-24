import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

import MessageChannelsManager from './MessageChannelsManager';
import ImpulseList from './ImpulseList';
import ActiveImpulse from './ActiveImpulse';
import NewImpulseForm from './NewImpulseForm';

class ImpulseManager extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { 
      impulses: [],
      sparks: [],
      active_impulse_id: null,
      active_spark_id: null
    };
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


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
        localStorage.setItem('login_session_token', auth_payload['auth_token']);
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
            this.setState({ impulses: impulses })
          })

        fetch(`${API_ROOT}/accounts/${auth_payload['account']['id']}/sparks`, {
          headers: {
            ...HEADERS,
            AuthorizationLogin: `Bearer ${auth_payload['auth_token']}`
          }
        })
          .then(res => res.json())
          .then(sparks => {
            console.log(sparks);
            this.setState({ sparks })
          })
      });
  };

  handleClick = id => {
    const active_spark = findActiveSpark(this.state.sparks, id);
    this.setState({ active_impulse_id: id, active_spark_id: active_spark.id });
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
    const { impulses, sparks, active_impulse_id, active_sparks_id } = this.state;
    const active_impulse = findActiveImpulse(impulses, active_impulse_id);
    const active_spark = findActiveSpark(sparks, active_impulse_id);

    return (
      <div className="ImpulseManager">
        {this.state.impulses.length && (
          <MessageChannelsManager 
          impulses={impulses}
          handleReceivedMessage={this.handleReceivedMessage}
          />
        )}
        <ImpulseList impulses={impulses} onClick={this.handleClick}/>
        {active_impulse_id && <ActiveImpulse active_impulse={active_impulse} active_spark={active_spark} />}
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

const findActiveSpark = (sparks, active_impulse_id) => {
  return sparks.find(
    spark => spark.impulse_id === active_impulse_id
  );
};
