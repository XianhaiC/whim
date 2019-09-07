import React from 'react';
import MessageFeed from './MessageFeed';
import CreateMessage from './CreateMessage';
import ImpulseHeader from './ImpulseHeader';

class CenterActiveImpulse extends React.Component {
  state = {

  };

  render = () => {
    console.log('centerActiveImpulse is rendering');
    return (
      <div className="CenterActiveImpulse">
        <p>Invite hash: {this.props.active_impulse.invite_hash}</p>
        <ImpulseHeader impulse={this.props.active_impulse}/>
        <MessageFeed impulse={this.props.active_impulse} sparks={this.props.sparks} />
        <CreateMessage impulse_id={this.props.active_impulse.id} spark_id={this.props.active_spark.id} />
      </div>
    );
  };
}

export default CreateMessage;
