import React, { Component } from 'react'
import { connect } from 'react-redux';

import { createInvite, linkAccount } from '../actions/index';

class ImpulseOptions extends Component {

  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAccountLink = this.handleAccountLink.bind(this);
    this.handleCreateInvite = this.handleCreateInvite.bind(this);
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    })
  }

  handleAccountLink() {
    this.props.linkAccount(this.props.activeSparkId, this.props.accountId);
  }

  handleCreateInvite() {
    this.props.createInvite(this.props.activeImpulseId);
  }

  toggleList() {
    this.setState( prevState => ({listOpen: !prevState.listOpen}));
  }

  render() {
    const { optionItems } = this.state

    return (
      <div className="impulse-options">
        <ul className="options-list">
          <button className="option-item" key="0" onClick={this.handleCreateInvite}> {optionItems[0].title} </button>
          <button className="option-item" key="1"> {optionItems[1].title} </button>
          <button className="option-item" key="2"> {optionItems[2].title} </button>
          <button className="option-item" key="3" onClick={this.handleAccountLink}> {optionItems[3].title} </button>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    accountId: state.session.accountId,
    activeImpulseId: state.control.activeImpulseId,
    activeSparkId: state.control.activeSparkId
  };
};

export default connect(mapStateToProps, {
  createInvite,
  linkAccount
})(ImpulseOptions);
