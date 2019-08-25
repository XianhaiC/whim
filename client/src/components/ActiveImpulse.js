import React from 'react';
import MessageFeed from './MessageFeed';
import NewMessageForm from './NewMessageForm';
import ImpulseOptionsList from './ImpulseOptionsList';

class ActiveImpulse extends React.Component {
  state = {
     
  };

  render = () => {
    return (
      <div className="ActiveImpulse">
        <MessageFeed impulse={this.props.active_impulse} />
        <NewMessageForm impulse_id={this.props.active_impulse.id} spark_id={this.props.active_spark.id} />
	  </div>
    );
  };
}

export default ActiveImpulse;
