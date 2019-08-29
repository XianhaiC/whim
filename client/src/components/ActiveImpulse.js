import React from 'react';
import MessageFeed from './MessageFeed';
import NewMessageForm from './NewMessageForm';
import ImpulseOptionsList from './ImpulseOptionsList';

class ActiveImpulse extends React.Component {
  state = {
     
  };

  render = () => {
    return (
      <div className="ActiveImpulse card text-white bg-dark">
        <div className="ActiveImpulsePadding card-body">
          <MessageFeed impulse={this.props.active_impulse} sparks={this.props.sparks} />
          <NewMessageForm impulse_id={this.props.active_impulse.id} spark_id={this.props.active_spark.id} />
	    </div>
      </div>
    );
  };
}

export default ActiveImpulse;
