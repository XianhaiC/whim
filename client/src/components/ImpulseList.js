import React from 'react';
import NewImpulseForm from './NewImpulseForm';

class ImpulseList extends React.Component {

  render = () => {
    return (
      <div className="ImpulseList col-md-4">
        <ul>{mapImpulses(this.props.impulses, this.props.onClick)}</ul> 
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
        {impulse.name}
      </li>
    );
  });
};
