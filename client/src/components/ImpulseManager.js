import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

import ImpulseManagerStyle from '../styles/ImpulseManagerStyle.css';
import MessageChannelsManager from './MessageChannelsManager';
import ImpulseList from './ImpulseList';
import ActiveImpulse from './ActiveImpulse';
import NewImpulseForm from './NewImpulseForm';
import NewSparkForm from './NewSparkForm';
import EmptyImpulse from './EmptyImpulse';
import ImpulseMessageSidebar from './ImpulseMessageSidebar';

class ImpulseManager extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { 
      impulses: [],
      sparks: [],
      active_impulse_id: null,
      active_spark_id: null,
      account_id: null,
      };
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleImpulseResponse = this.handleImpulseResponse.bind(this);
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
        // persist the login for the session
        localStorage.setItem('login_session_token', auth_payload['auth_token']);
        this.setState({ account_id: auth_payload['account']['id'] });

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
    this.setActiveImpulse(id);
  };

  setActiveImpulse = id => {
    const active_spark = findActiveSpark(this.state.sparks, id);
    console.log(`FOUND ${active_spark} id: ${id}`);
    console.log(this.state.sparks);
    console.log(this.state.impulses);
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

  render = () => {
    const { impulses, sparks, active_impulse_id, active_spark_id } = this.state;
    const active_impulse = findActiveImpulse(impulses, active_impulse_id);
    const active_spark = findActiveSpark(sparks, active_impulse_id);

    let impulseComponent = null;
    let messageSidebarComponent = null;
    if (active_impulse_id) {
      if (active_spark_id) {
        impulseComponent = <ActiveImpulse active_impulse={active_impulse} active_spark={active_spark} sparks={sparks}/>
        messageSidebarComponent = <ImpulseMessageSidebar active_impulse={active_impulse} sparks={sparks} /> 
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
        {this.state.impulses.length && (
          <MessageChannelsManager 
          impulses={impulses}
          handleReceivedMessage={this.handleReceivedMessage}
          />
        )}
        <div className="ViewportWrapper row bg-light">
          <div className="ImpulseListSidebar col-md-4 card bg-secondary text-white">
            <div className="sticky-top">
              <div className="ILSidebarHeader card-header">Impulses</div>
              <ImpulseList 
                impulses={impulses} 
                onClick={this.handleClick} 
                onImpulseResponse={this.handleImpulseResponse}
              />
            </div>
		  </div>
          <div className="ImpulseComponent col-md-5">
            {impulseComponent}
		  </div>
          <div className="MessageSidebarComponent col-md-3 sticky-top">
            {messageSidebarComponent}
          </div>
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
