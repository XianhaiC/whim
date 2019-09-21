import React from 'react';

import ImpulseHeader from './ImpulseHeader';
import ImpulseOptions from './ImpulseOptions';
import ActiveThread from './ActiveThread';
import CreateMessage from './CreateMessage';

class ActiveImpulse extends React.Component {
  render() {
    return (
      <div className="active-impulse">
        <ImpulseHeader />
        <ImpulseOptions />
        <ActiveThread />
        <CreateMessage />
      </div>
    );
  }
}

export default ActiveImpulse;
