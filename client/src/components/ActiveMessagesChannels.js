import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const ActiveMessagesChannels =({ impulses, handleReceivedMessage }) => {
    return (
        <Fragment>
          {
            impulses.map(impulse => {
              return (
                  <ActionCable
                  key={impulse.id}
                  channel={{ channel: 'ActiveMessagesChannel', impulse: impulse.id}}
                  onReceived={handleReceivedMessage}
                  />
              );
            })
          }
        </Fragment>
    );
};

export default ActiveMessagesChannels; 
