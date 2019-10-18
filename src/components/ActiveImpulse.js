import React from 'react';

import ImpulseHeader from './ImpulseHeader';
import ActiveThread from './ActiveThread';
import CreateMessage from './CreateMessage';
import Rightbar from './Rightbar';

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
          <Rightbar />
        </div>
      </div>
    );
  }
}

export default ActiveImpulse;
