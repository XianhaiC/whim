import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import ImpulseOptionsList from './ImpulseOptionsList';

class MessageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      active_impulse: this.props.active_impulse,
      sparks: this.props.sparks,
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

/*
  componentWillReceiveProps = nextProps => {
    this.setState({ impulse_id: nextProps.impulse_id, spark_id: nextProps.spark_id });
  };
*/

  handleChange = e => {
    this.setState({ body: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const login_session_token = localStorage.getItem('login_session_token');

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${login_session_token}`
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ body: '' });
  };

  render = () => {
    return (
      <div className="MessageSidebar card">
        <div className="MessageSidebarHeader card-header">{this.state.active_impulse.name}</div>
        <div className="MessageSidebarDesc card-body">This is where description will go TODO</div>
        <ImpulseOptionsList list={this.state.option_links}/>
      </div>
    );
  };
}

export default MessageSidebar;
