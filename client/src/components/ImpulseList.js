import React from 'react';

class ImpulseList extends React.Component {

  render = () => {
    return (
      <div className="ImpulseList">
        <ul>{mapImpulses(impulses, this.props.onClick)}</ul> 
        <NewImpulseForm />
      </div>
    );
  }
}

export default ImpulseList;

const mapImpulses = (impulses, handleClick) => {
  return impulses.map(impulse => {
    return (
      <li key={impulse.id} onClick={() => handleClick (impulse.id)}>
        {impulse.title}
      </li>
    );
  });
};
