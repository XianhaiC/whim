import React from 'react';

import ImpulseList from './ImpulseList';
import CreateImpulse from './CreateImpulse';
import JoinImpulse from './JoinImpulse';

class LeftSidebar extends React.Component {

  render = () => {
    let linked_impulses = []
    let session_impulses = [];
    
    sorted_impulses(this.props.impulses).forEach(impulse => {
      if (this.props.session_impulse_ids.includes(impulse.id))
        session_impulses.push(impulse);
      else
        linked_impulses.push(impulse);
    });

    return (
      <div className="left_sidebar">
        <ImpulseList list_name="Linked Impulses" impulses={linked_impulses} on_click={this.props.on_click_active_impulse} />
        <ImpulseList list_name="Session Impulses" impulses={session_impulses} on_click={this.props.on_click_active_impulse} />
        <div className="left_sidebar_buttons">
          <CreateImpulse on_click={this.props.on_click_create_impulse} />
          <JoinImpulse on_click={this.props.on_click_join_impulse} />
        </div>
      </div>
    );
  }
}

export default LeftSidebar;

// helpers

const sorted_impulses = impulses => {
  const sorted = impulses.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return sorted;
}
