import React from 'react';

import LoadAccount from './LoadAccount';
import LoadSession from './LoadSession';
import LoadMessages from './LoadMessages';
import MessageThreadsChannel from './MessageThreadsChannel';

const Functionals = () => {
  return (
    <div className="functionals">
      <LoadAccount />
      <LoadSession />
      <LoadMessages />
      <MessageThreadsChannel />
    </div>
  );
};

export default Functionals;
