import React from 'react';

class ImpulseList extends React.Component {
  render() {
    return (
      <div className="impulse_list">
        <p>{this.props.list_name}</p>
        <hr />
        <ul className="impulse_list_flex">{createImpulseCards(this.props.impulses, this.props.on_click)}</ul> 
      </div>
    );
  }
}

export default ImpulseList;

// helpers

const createImpulseCards = (impulses, handle_click) => {
  return impulses.map(impulse => {
    return (
      <li className="impulse_card" key={impulse.id} onClick={() => handle_click (impulse.id)}>
        <img src={"../images/flame.jpg"} alt="Impulse pic" />
        <p>{impulse.name}</p>
        <hr />
      </li>
    );
  });
};
