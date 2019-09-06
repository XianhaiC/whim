import React from 'react';

class ImpulseHeader extends React.Component {
  render() {
    return (
      <div className="ImpulseHeader">
        <div className="impulse-info-flex">
          <h3>{this.props.impulse.name}</h3>
          <p>xxx Sparks</p>
        </div>
        <button className="right-sidebar-toggle">Right Sidebar</button>
      </div>
    );
  }
}

export default ImpulseHeader;
