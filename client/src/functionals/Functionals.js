import React from 'react';

import LoadAccount from './LoadAccount';
import LoadSession from './LoadSession';
import MessageThreadsChannel from './MessageThreadsChannel';

const Functionals = () => {
  return (
    <div className="functionals">
      <LoadAccount />
      <LoadSession />
      <MessageThreadsChannel />
    </div>
  );
};

export default Functionals;
