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
  }

  render = () => {
    console.log("LOOF IN EHEHRE " + this.props.logged_in);
    return (
      <div className="MessageSidebar card">
        <div className="MessageSidebarHeader card-header">{this.state.active_impulse.name}</div>
        <div className="MessageSidebarDesc card-body">This is where description will go TODO</div>
        <ImpulseOptionsList 
          onAccountLinked={this.props.onAccountLinked}
          account_id={this.props.account_id} 
          logged_in={this.props.logged_in}
          list={this.state.option_links}
          active_spark_id={this.props.active_spark.id} />
      </div>
    );
  };
}

export default MessageSidebar;
