import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable =({ impulses, handleReceivedMessage }) => {
    return (
        <Fragment>
          {impulses.map(impulse => {
              return (
                  <ActionCable
                  key={impulse.id}
                  channel={{ channel: '', impulse: impulse.id}}
                  onReceived={handleReceivedMEssage}
                  />
              );
          })}
        </Fragment>
    );
};

export default Cable; 