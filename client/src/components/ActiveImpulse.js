import React from 'react';

import ImpulseHeader from './ImpulseHeader';
import ImpulseOptions from './ImpulseOptions';
import ActiveThread from './ActiveThread';
import CreateMessage from './CreateMessage';
import InspirationBar from './InspirationBar';

class ActiveImpulse extends React.Component {
  render() {
    return (
      <div className="active-impulse">
        <div className="active-impulse-mid">
          <ImpulseHeader />
          <ActiveThread />
          <CreateMessage />
        </div>
        <div className="active-impulse-right">
          <InspirationBar />
        </div>
      </div>
    );
  }
}

export default ActiveImpulse;
