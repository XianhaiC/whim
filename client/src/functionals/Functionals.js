import React from 'react';

import LoadAccount from './LoadAccount';
import LoadSession from './LoadSession';
import LoadMessages from './LoadMessages';
import MessageThreadsChannel from './MessageThreadsChannel';
import ImpulsesChannel from './ImpulsesChannel';

const Functionals = () => {
  return (
    <div className="functionals">
      <LoadAccount />
      <LoadSession />
      <LoadMessages />
      <MessageThreadsChannel />
      <ImpulsesChannel />
    </div>
  );
};

export default Functionals;
