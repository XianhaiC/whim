import React from 'react';
import { connect } from 'react-redux';

import { RightbarComponent } from '../helpers';

import InspirationList from './InspirationList';
import InspirationDetails from './InspirationDetails';
import ImpulseDetails from './ImpulseDetails';

class Rightbar extends React.Component {
  render() {
    let rightbarComponent = null;

    switch (this.props.rightbarComponent) {
      case RightbarComponent.LIST:
        rightbarComponent = <InspirationList />
        break;
      case RightbarComponent.DETAILS:
        rightbarComponent = <InspirationDetails />
        break;
      case RightbarComponent.INFO:
        rightbarComponent = <ImpulseDetails />
        break;
      default:
        break;
    }

    return (
      <div className="rightbar">
        {rightbarComponent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rightbarComponent: state.control.rightbarComponent
  };
};

export default connect(mapStateToProps)(Rightbar);
