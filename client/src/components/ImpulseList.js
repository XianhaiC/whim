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
    const { sessionToken, accountId } = this.props;

    console.log("FINDING");
    console.log(this.props.sparks);
    console.log(sessionToken);
    console.log(accountId);

    /*
    let found = null;
    found  = Object.values(this.props.sparks).find(spark =>
      spark.impulse_id == impulse.id
      && (spark.account_id == accountId
        || spark.session_token === sessionToken)
    );
    */
    let found = null;
    Object.values(this.props.sparks).forEach(spark => {
      let imp = spark.impulse_id == impulse.id;
      let sec = spark.account_id == accountId;
      let sess = spark.session_token === sessionToken;
      console.log("PER");
      console.log(spark.accountId);
      console.log(spark.session_token);
      console.log(imp);
      console.log(sec);
      console.log(sess);
      if (imp && (sec || sess)) found = spark
    });

    // update the state with the new impulse
    // this sets the active spark and thread as well
    this.props.switchImpulse(impulse, found);
  }

  render() {
    if (this.props.impulses.length === 0) return null;
    return (
      <div className="impulse-list">
        <div className="impulse-list-header">
          <hr className="hr-pre" />
          <h3>{this.props.listName}</h3>
          <hr className="hr-post" />
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
  switchImpulse
})(ImpulseList);

// helpers
const createImpulseCards = (impulses, handleClick) => {
  let cards = [];
  impulses.forEach((impulse, index) => {
    cards.push((
      <li className="impulse-card" key={impulse.id}
        onClick={() => handleClick (impulse)}>
        <div className="impulse-card-pic"></div>
        <div className="impulse-card-info">
          <p className="impulse-card-name">{impulse.name}</p>
          <p className="impulse-card-sparks">X Sparks joined</p>
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
