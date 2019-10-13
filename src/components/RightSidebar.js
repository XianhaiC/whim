import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

import RightImpulseInfo from './RightImpulseInfo';
import RightImpulseOptions from './RightImpulseOptions';

class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      active_impulse: this.props.active_impulse,
      sparks: this.props.sparks,
    };
  }

  render = () => {
    return (
      <div className="RightSidebar">
        <RightImpulseInfo impulse={this.props.active_impulse}/>
        <RightImpulseOptions 
          onAccountLinked={this.props.onAccountLinked}
          onInviteCreated={this.props.onInviteCreated}
          account_id={this.props.account_id} 
          logged_in={this.props.logged_in}
          list={this.state.option_links}
          active_impulse_id={this.props.active_impulse.id}
          active_spark_id={this.props.active_spark.id} />
      </div>
    );
  };
}

export default RightSidebar;
