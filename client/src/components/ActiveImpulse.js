import React from 'react';
import MessageFeed from './MessageFeed';
import NewMessageForm from './NewMessageForm';

class ActiveImpulse extends React.Component {
  state = {
     
  };

  render = () => {
    return (
      <div className="ActiveImpulse card text-white bg-dark">
        <div className="ActiveImpulsePadding card-body">
          <p>Invite hash: {this.props.active_impulse.invite_hash}</p>
          <MessageFeed impulse={this.props.active_impulse} sparks={this.props.sparks} />
          <NewMessageForm impulse_id={this.props.active_impulse.id} spark_id={this.props.active_spark.id} />
	    </div>
      </div>
    );
  };
}

export default ActiveImpulse;
