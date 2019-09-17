import React from 'react';

import ImpulseHeader from './ImpulseHeader';
import ActiveThread from './ActiveThread';
import CreateMessage from './CreateMessage';

class ActiveImpulse extends React.Component {
  render() {
    return (
      <div className="active-impulse">
        <p>Invite hash: {this.props.active_impulse.invite_hash}</p>
        <ImpulseHeader />
        <ActiveThread />
        <CreateMessage />
      </div>
    );
  }
}

export default ActiveImpulse;
