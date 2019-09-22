import React from 'react';
import { connect } from 'react-redux';

import { switchImpulse } from '../actions/index';

class ImpulseList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(impulse) {
    // find the impulses' corresponding spark
    const spark = this.props.sparks.find(
      spark => spark.impulse_id === impulse.id);

    // update the state with the new impulse
    // this sets the active spark and thread as well
    this.props.switchImpulse(impulse, spark);
  }

  render() {
    return (
      <div className="impulse-list">
        <p>{this.props.listName}</p>
        <hr />
        <ul className="impulse-list-flex">
          {
            createImpulseCards(
            sortImpulses(this.props.impulses),
            this.handleClick)
          }
        </ul>
      </div>
    );
  }
}

export default connect(null, { switchImpulse })(ImpulseList);

// helpers
const createImpulseCards = (impulses, handleClick) => {
  return impulses.map(impulse => {
    return (
      <li className="impulse_card" key={impulse.id}
        onClick={() => handleClick (impulse)}>
        <img src={"../images/flame.jpg"} alt="Impulse pic" />
        <p>{impulse.name}</p>
        <hr />
      </li>
    );
  });
};

const sortImpulses = impulses => {
  const sorted = impulses.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return sorted;
}
