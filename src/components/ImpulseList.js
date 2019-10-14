import React from 'react';
import { connect } from 'react-redux';

import { switchImpulse, setScrollDown, setFirstLoad } from '../actions/index';

class ImpulseList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(impulse) {
    // find the impulses' corresponding spark
    const { sessionToken, accountId } = this.props;

    let found = null;
    found = Object.values(this.props.sparks).find(spark =>
      spark.impulse_id == impulse.id
      && (spark.account_id == accountId
        || spark.session_token === sessionToken)
    );

    // update the state with the new impulse
    // this sets the active spark and thread as well
    this.props.switchImpulse(impulse, found);
    this.props.setFirstLoad(true);
    this.props.setScrollDown(true);
  }

  render() {
    if (this.props.impulses.length === 0) return null;
    return (
      <div className="impulse-list">
        <div className="impulse-list-header">
          <h3>{this.props.listName}</h3>
        </div>
        <ul className="impulse-list-container">
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

const mapStateToProps = state => {
  return {
    accountId: state.session.accountId,
    sessionToken: state.session.sessionToken,
    sparks: state.data.sparks
  };
};

export default connect(mapStateToProps, {
  switchImpulse,
  setScrollDown,
  setFirstLoad,
})(ImpulseList);

// helpers
const createImpulseCards = (impulses, handleClick) => {
  let cards = [];
  impulses.forEach((impulse, index) => {
    cards.push((
      <li className="impulse-card" key={impulse.id}
        onClick={() => handleClick (impulse)}>
        <div className="impulse-card-info">
          <p className="impulse-card-name">
            <i className="fas fa-hashtag impulse-card-pic"></i>  {impulse.name}
          </p>
          <p className="impulse-card-sparks">{impulse.sparks_joined} Spark{impulse.sparks_joined != 1 ? "s" : ""} joined</p>
        </div>
      </li>
    ));
  });

  return cards;
};

const sortImpulses = impulses => {
  const sorted = impulses.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return sorted;
}
