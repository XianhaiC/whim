import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

import MessageChannelsManager from './MessageChannelsManager';
import ImpulseList from './ImpulseList';
import ActiveImpulse from './ActiveImpulse';
import NewImpulseForm from './NewImpulseForm';
import NewSparkForm from './NewSparkForm';
import EmptyImpulse from './EmptyImpulse';
import ImpulseOptionsList from './ImpulseOptionsList';
import LoginForm from './LoginForm';

class ImpulseManager extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { 
      impulses: [],
      sparks: [],
      active_impulse_id: null,
      active_spark_id: null,
      account_id: null,
      option_links: [
        {
          index: 0, 
          title: 'Create Invite Link', 
          selection: false, 
          key: 'option-links:'
        },
        {
          index: 1, 
          title: 'Edit Channel Account', 
          selection: false, 		
          key: 'option-links'
        },
        {
          index: 2, 
          title: 'Channel Settings', 
          selection: false, 
          key: 'option-links'
        },
        {
          index: 3, 
          title: 'Link Account', 
          selection: false, 
          key: 'option-links'
        }
      ]
    };

    this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleImpulseResponse = this.handleImpulseResponse.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    // check if a login session token exists

  }
  

  handleClick = id => {
    this.setActiveImpulse(id);
  };

  setActiveImpulse = id => {
    const active_spark = findActiveSpark(this.state.sparks, id);
    console.log(`FOUND ${active_spark} id: ${id}`);
    console.log(this.state.sparks);
    let active_spark_id = null;
    if (typeof active_spark !== "undefined") {
      active_spark_id = active_spark.id;
    }
    this.setState({ active_impulse_id: id, active_spark_id: active_spark_id });
  }

  handleReceivedMessage = response => {
    const { message } = response;
    const impulses = [...this.state.impulses];
    const impulse = impulses.find(
      impulse => impulse.id === message.impulse_id
    );
    impulse.messages = [...impulse.messages, message];
    this.setState({ impulses });
  };

  handleImpulseResponse = impulse => {
    this.setState({ impulses: [...this.state.impulses, impulse]});
    this.setActiveImpulse(impulse.id);
  }

  handleSparkCreation = spark => {
    console.log("CREATING SPARL");
    this.setState({ sparks: [...this.state.sparks, spark] });
    const impulses = [...this.state.impulses];
    const impulse = impulses.find(
      impulse => impulse.id === spark.impulse_id
    );
    impulse.sparks = [...impulse.sparks, spark];
    this.setState({ impulses });
    this.setActiveImpulse(this.state.active_impulse_id);
  }

  handleLogin = auth_payload => {
    this.setState({ account_id: auth_payload['account']['id'] });

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
  }

  render = () => {
    const { impulses, sparks, active_impulse_id, active_spark_id } = this.state;
    const active_impulse = findActiveImpulse(impulses, active_impulse_id);
    const active_spark = findActiveSpark(sparks, active_impulse_id);

    let impulseComponent = null;
    if (active_impulse_id) {
      if (active_spark_id) {
        impulseComponent = <ActiveImpulse active_impulse={active_impulse} active_spark={active_spark} sparks={sparks}/>
      }
      else {
        impulseComponent = ( <NewSparkForm 
          impulse_id={active_impulse_id} 
          account_id={this.state.account_id} 
          onSparkCreation={this.handleSparkCreation}
          />
        )
      }
    }
    else {
      impulseComponent = <EmptyImpulse />
    }

    return (
      <div className="ImpulseManager">
        <LoginForm onLogin={this.handleLogin} />
        {this.state.impulses.length && (
          <MessageChannelsManager 
          impulses={impulses}
          handleReceivedMessage={this.handleReceivedMessage}
          />
        )}
        <div className="ViewportWrapper row">
          <ImpulseList 
            impulses={impulses} 
            onClick={this.handleClick} 
            onImpulseResponse={this.handleImpulseResponse}
          />
          {impulseComponent}
        </div>
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
