//TODO: impulses show up twice sometimes when reloading after linking a new account.
// this could be a problem with session sparks/impulses not being deleted, thus adding in a
// duplicate object when retreiving session and login info
import React from 'react';
import { API_ROOT, HEADERS, UNDEFINED } from '../constants';
import { exists } from './helpers';

import ImpulseManagerStyle from '../styles/ImpulseManagerStyle.css';
import MessageChannelsManager from './MessageChannelsManager';
import ImpulseList from './ImpulseList';
import ActiveImpulse from './ActiveImpulse';
import NewImpulseForm from './NewImpulseForm';
import NewSparkForm from './NewSparkForm';
import EmptyImpulse from './EmptyImpulse';
import MessageSidebar from './MessageSidebar';
import LoginForm from './LoginForm';

class ImpulseManager extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { 
      impulses: [],
      sparks: [],
      session_impulse_ids: [],
      session_spark_ids: [],
      active_impulse_id: null,
      active_spark_id: null,
      account_id: null,
      account_session_token: null,
      logged_in: false,
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
    this.handleImpulseCreated = this.handleImpulseCreated.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSparkCreated = this.handleSparkCreated.bind(this);
    this.handleAccountLinked = this.handleAccountLinked.bind(this);
    this.handleInviteCreated = this.handleInviteCreated.bind(this);

    // check if an account session token exists
    this.state.account_session_token = sessionStorage.getItem('account_session_token');
    this.state.account_id = sessionStorage.getItem('login_account_id');
    this.state.logged_in = exists(this.state.account_id) && exists(this.state.account_session_token);
    console.log("Logged in ? " + this.state.logged_in);

    // check if a session token for sparks exists
    this.state.spark_session_token = sessionStorage.getItem('spark_session_token');
    console.log("Session exists ? " + exists(this.state.spark_session_token));
  }

  componentDidMount = () => {
    // if logged in for the session, load the account's impulses
    if (this.state.logged_in) this.loginAccount();

    // register for a new session if we haven't already
    if (!exists(this.state.spark_session_token)) this.registerSession();
    else this.loadSessionImpulses();

    // add the impulse we are invited to if an invite link is used to access the app
    if (this.props.invite_hash != null) this.fetchInvitedImpulse();
  }
  

  handleClick = id => {
    this.setActiveImpulse(id);
  };


  handleReceivedMessage = response => {
    const { message, spark } = response;
    const impulses = [...this.state.impulses];
    const impulse = impulses.find(
      impulse => impulse.id === message.impulse_id
    );

    // add the message to the impulse
    impulse.messages = [...impulse.messages, message];

    // add the spark poster if they're new
    if (impulse.sparks.find(spark_poster => spark_poster.id === spark.id) !== UNDEFINED) {
      impulse.sparks = [...impulse.sparks, spark];
    }

    this.setState({ impulses });
  };

  handleImpulseCreated = impulse => {
    this.setState({ 
      impulses: [...this.state.impulses, impulse], 
      session_impulse_ids: [...this.state.session_impulse_ids, impulse.id]
    });
    this.setActiveImpulse(impulse.id);
  }

  handleSparkCreated = spark => {
    this.setState({ sparks: [...this.state.sparks, spark] });
    console.log("NEW SPARK LIST:");
    console.log(this.state.sparks);
    const impulses = [...this.state.impulses];
    const active_impulse = impulses.find(
      impulse => impulse.id === this.state.active_impulse_id
    );
    active_impulse.sparks = [...active_impulse.sparks, spark];

    // set the created spark to be the active one
    this.setState({ 
      impulses: impulses,
      active_spark_id: spark.id,
      session_spark_ids: [...this.state.session_spark_ids, spark.id]
    });
  }

  handleLogin = auth_payload => {
    this.setState({ account_id: auth_payload['account']['id'] });
    this.loginAccount();
  }

  handleAccountLinked(spark_id) {
    // assume the user is logged in, since they'd long ago be redirected otherwise
    console.log("LINKED SPARK " + spark_id);
    console.log(this.state.sparks);
    
    // remove the linked spark and its impulse from the session lists
    let sparks = [...this.state.sparks]
    let linked_spark = sparks.find(spark => spark.id === spark_id);
    linked_spark.account_id = this.state.account_id;
    const linked_impulse = this.state.impulses.find(impulse => impulse.id == linked_spark.impulse_id);
    const session_spark_ids_new = this.state.session_spark_ids.filter(id => id !== spark_id);
    const session_impulse_ids_new = this.state.session_impulse_ids.filter(id => id !== linked_impulse.id);

    this.setState({ sparks: sparks, session_spark_ids: session_spark_ids_new, session_impulse_ids: session_impulse_ids_new });
  }

  handleInviteCreated(invited_impulse) {
    let impulses  = [...this.state.impulses.filter(impulse => impulse.id !== invited_impulse.id), invited_impulse];
    this.setState({ impulses });
    console.log("INVITE CREATED: " + invited_impulse.invite_hash);
    
  }

  loginAccount = () => {
    const account_session_token = sessionStorage.getItem('account_session_token');
    if (!exists(this.state.account_id) || !exists(account_session_token)) {
      this.setState({ logged_in: false });
      return false;
    }

    fetch(`${API_ROOT}/accounts/${this.state.account_id}/impulses`, {
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${account_session_token}`
      }
    })
      .then(res => res.json())
      .then(impulses => {
        console.log("FETCHED IMPULSES:");
        console.log(impulses);
        this.setState({ 
          impulses: [...this.state.impulses, ...impulses],
        });
      });

    fetch(`${API_ROOT}/accounts/${this.state.account_id}/sparks`, {
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${account_session_token}`
      }
    })
      .then(res => res.json())
      .then(sparks => {
        console.log("FETCHED SPARKS:");
        console.log(sparks);
        this.setState({ 
          sparks: [...this.state.sparks, ...sparks],
        });
      });

    this.setState({ logged_in: true });
  }

  registerSession = () => {
    fetch(`${API_ROOT}/register`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(auth_payload => {
      this.setState({ spark_session_token: auth_payload.auth_token });
      sessionStorage.setItem('spark_session_token', auth_payload.auth_token);
      this.loadSessionImpulses();
    });
  }

  loadSessionImpulses = () => {
    const spark_session_token = sessionStorage.getItem('spark_session_token');
    console.log("LOADING SESSION");

    fetch(`${API_ROOT}/session-sparks`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationSession: `Bearer ${spark_session_token}`
      },
      body: JSON.stringify({ session_token: spark_session_token })
    })
    .then(res => res.json())
    .then(session_info => {
      
      const session_impulses = session_info.impulses;
      const session_sparks = session_info.sparks;

      console.log("SESSION SPARKS:");
      console.log(session_sparks);
      const session_impulse_ids = session_impulses.map(impulse => impulse.id);
      const session_spark_ids = session_sparks.map(spark => spark.id);

      this.setState({
        impulses: [...this.state.impulses, ...session_impulses],
        sparks: [...this.state.sparks, ...session_sparks],
        session_impulse_ids: [...this.state.session_impulse_ids, ...session_impulse_ids],
        session_spark_ids: [...this.state.session_spark_ids, ...session_spark_ids]
      });

      console.log("SPARKS UPDATED:");
      console.log(this.state.sparks);

    });
  }

  fetchInvitedImpulse() {
    fetch(`${API_ROOT}/impulses/invite/${this.props.invite_hash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(impulse => {
      //TODO: redirect to error page if link is expired/non-existent
      console.log("FETCHED INVITE");
      console.log(impulse);
      this.handleImpulseCreated(impulse);
    });
  }

  setActiveImpulse = id => {
    // grab the spark associated with the impulse
    const active_spark = findActiveSpark(this.state.sparks, id);
    let active_spark_id = null;
    if (exists(active_spark)) {
      active_spark_id = active_spark.id;
    }
    this.setState({ active_impulse_id: id, active_spark_id: active_spark_id });
  }

  render = () => {
    const { impulses, sparks, active_impulse_id, active_spark_id } = this.state;
    const active_impulse = findActiveImpulse(impulses, active_impulse_id);
    const active_spark = findActiveSpark(sparks, active_impulse_id);
    console.log("LOGGED INNN?? " + this.state.logged_in);

    let impulseComponent = null;
    let rightSidebarComponent = null;
    if (active_impulse_id) {
      if (active_spark_id) {
        impulseComponent = (<ActiveImpulse 
          active_impulse={active_impulse} 
          active_spark={active_spark} 
          sparks={sparks}/>
        )

        rightSidebarComponent = (<MessageSidebar 
          onAccountLinked={this.handleAccountLinked} 
          onInviteCreated={this.handleInviteCreated}
          account_id={this.state.account_id}
          logged_in={this.state.logged_in}
          active_impulse={active_impulse} 
          active_spark={active_spark} 
          sparks={sparks} />
        )
      }
      else {
        impulseComponent = (<NewSparkForm 
          impulse_id={active_impulse_id} 
          account_id={this.state.account_id} 
          onSparkCreated={this.handleSparkCreated} />
        )
      }
    }
    else {
      impulseComponent = <EmptyImpulse />
    }

    return (
      <div className="ImpulseManager">
        {this.props.invited_impulse != null && <p>{this.props.invited_impulse.invite_hash}</p>}
        {!this.state.logged_in && <LoginForm onLogin={this.handleLogin} />}
          <MessageChannelsManager 
          impulses={impulses}
          handleReceivedMessage={this.handleReceivedMessage}
          />

        <div className="ViewportWrapper row bg-light">
          <div className="ImpulseListSidebar col-md-4 card bg-secondary text-white">
            <div className="sticky-top">
              <ImpulseList 
                impulses={impulses} 
                onClick={this.handleClick} 
                onImpulseCreated={this.handleImpulseCreated}
              />
            </div>
	  </div>
          <div className="ImpulseComponent col-md-5">
            {impulseComponent}
	  </div>
          <div className="rightSidebarComponent col-md-3">
            {rightSidebarComponent}
          </div>
        </div>
      </div>
    );
  };
}

export default ImpulseManager;

// helper functions

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

