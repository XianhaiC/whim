import React from 'react';
import { connect } from 'react-redux';

import ActiveImpulse from './ActiveImpulse';
import CreateImpulse from './CreateImpulse';
import JoinImpulse from './JoinImpulse';
import CreateSpark from './CreateSpark';
import Empty from './Empty';

class Center extends React.Component {
  render() {
    let centerComponent = null;

    switch (this.props.centerComponent) {
      case CenterComponent.ACTIVE:
        centerComponent = <ActiveImpulse />
        break;
      case CenterComponent.CREATE:
        centerComponent = <CreateImpulse />
        break;
      case CenterComponent.JOIN:
        centerComponent = <JoinImpulse />
        break;
      case CenterComponent.SPARK:
        centerComponent = <CreateSpark />
      case CenterComponent.BLANK:
      default:
        centerComponent = <Empty />
        break;
    }

    return { centerComponent };
  }
}

export mapStateToProps = state => {
  return {
    centerComponent: state.centerComponent
  };
};

export default connect(mapStateToProps)(Center);

