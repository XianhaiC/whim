import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import ImpulseOptionsList from './ImpulseOptionsList';

class ImpulseMessageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      impulse: this.props.active_impulse,
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

 /* componentWillReceiveProps = nextProps => {
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
      <div className="ImpulseMessageSidebar card">
         <div className="IMSidebarHeader card-header">{this.state.impulse.name} </div> 
         <div className="IMSidebarDesc card-body">This is where the description will go TODO</div>
         <ImpulseOptionsList list={this.state.option_links}/>
      </div>
    );
  };
}

export default ImpulseMessageSidebar;
